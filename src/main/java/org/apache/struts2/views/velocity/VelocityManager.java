/*
 * $Id$
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.apache.struts2.views.velocity;

import com.opensymphony.xwork2.ObjectFactory;
import com.opensymphony.xwork2.inject.Container;
import com.opensymphony.xwork2.inject.Inject;
import com.opensymphony.xwork2.util.ValueStack;
import com.opensymphony.xwork2.util.logging.Logger;
import com.opensymphony.xwork2.util.logging.LoggerFactory;
import com.taobao.rigel.rap.common.config.SystemConstant;
import com.taobao.rigel.rap.common.utils.DateUtils;
import com.taobao.rigel.rap.common.utils.SystemVisitorLog;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsConstants;
import org.apache.struts2.StrutsException;
import org.apache.struts2.util.VelocityStrutsUtil;
import org.apache.struts2.views.TagLibrary;
import org.apache.struts2.views.TagLibraryDirectiveProvider;
import org.apache.struts2.views.jsp.ui.OgnlTool;
import org.apache.struts2.views.util.ContextUtil;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.context.Context;
import org.apache.velocity.tools.view.ToolboxManager;
import org.apache.velocity.tools.view.context.ChainedContext;
import org.apache.velocity.tools.view.servlet.ServletToolboxManager;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;


/**
 * Manages the environment for Velocity result types
 */
public class VelocityManager {
    public static final String STRUTS = "struts";
    public static final String KEY_VELOCITY_STRUTS_CONTEXT = ".KEY_velocity.struts2.context";
    /**
     * the parent JSP tag
     */
    public static final String PARENT = "parent";
    /**
     * the current JSP tag
     */
    public static final String TAG = "tag";
    private static final Logger LOG = LoggerFactory.getLogger(VelocityManager.class);
    /**
     * A reference to the toolbox manager.
     */
    protected ToolboxManager toolboxManager = null;
    private ObjectFactory objectFactory;
    private VelocityEngine velocityEngine;
    private String toolBoxLocation;


    /**
     * Names of contexts that will be chained on every request
     */
    private String[] chainedContextNames;

    private Properties velocityProperties;

    private String customConfigFile;

    private List<TagLibraryDirectiveProvider> tagLibraries;
    private List<TagLibrary> oldTagLibraries;

    private static final String replace(String string, String oldString, String newString) {
        if (string == null) {
            return null;
        }
        // If the newString is null, just return the string since there's nothing to replace.
        if (newString == null) {
            return string;
        }
        int i = 0;
        // Make sure that oldString appears at least once before doing any processing.
        if ((i = string.indexOf(oldString, i)) >= 0) {
            // Use char []'s, as they are more efficient to deal with.
            char[] string2 = string.toCharArray();
            char[] newString2 = newString.toCharArray();
            int oLength = oldString.length();
            StringBuilder buf = new StringBuilder(string2.length);
            buf.append(string2, 0, i).append(newString2);
            i += oLength;
            int j = i;
            // Replace all remaining instances of oldString with newString.
            while ((i = string.indexOf(oldString, i)) > 0) {
                buf.append(string2, j, i - j).append(newString2);
                i += oLength;
                j = i;
            }
            buf.append(string2, j, string2.length - j);
            return buf.toString();
        }
        return string;
    }

    @Inject
    public void setObjectFactory(ObjectFactory fac) {
        this.objectFactory = fac;
    }

    @Inject
    public void setContainer(Container container) {
        List<TagLibraryDirectiveProvider> list = new ArrayList<TagLibraryDirectiveProvider>();
        Set<String> prefixes = container.getInstanceNames(TagLibraryDirectiveProvider.class);
        for (String prefix : prefixes) {
            list.add(container.getInstance(TagLibraryDirectiveProvider.class, prefix));
        }
        this.tagLibraries = Collections.unmodifiableList(list);

        List<TagLibrary> oldList = new ArrayList<TagLibrary>();
        Set<String> oldPrefixes = container.getInstanceNames(TagLibrary.class);
        for (String prefix : oldPrefixes) {
            oldList.add(container.getInstance(TagLibrary.class, prefix));
        }
        this.oldTagLibraries = Collections.unmodifiableList(oldList);
    }

    /**
     * @return a reference to the VelocityEngine used by <b>all</b> struts velocity thingies with the exception of
     * directly accessed *.vm pages
     */
    public VelocityEngine getVelocityEngine() {
        return velocityEngine;
    }

    /**
     * This method is responsible for creating the standard VelocityContext used by all WW2 velocity views.  The
     * following context parameters are defined:
     * <p/>
     * <ul>
     * <li><strong>request</strong> - the current HttpServletRequest</li>
     * <li><strong>response</strong> - the current HttpServletResponse</li>
     * <li><strong>stack</strong> - the current {@link ValueStack}</li>
     * <li><strong>ognl</strong> - an {@link OgnlTool}</li>
     * <li><strong>struts</strong> - an instance of {@link org.apache.struts2.util.StrutsUtil}</li>
     * <li><strong>action</strong> - the current Struts action</li>
     * </ul>
     *
     * @return a new StrutsVelocityContext
     */
    public Context createContext(ValueStack stack, HttpServletRequest req, HttpServletResponse res) {
        Context result = null;
        VelocityContext[] chainedContexts = prepareChainedContexts(req, res, stack.getContext());
        StrutsVelocityContext context = new StrutsVelocityContext(chainedContexts, stack);
        Map standardMap = ContextUtil.getStandardContext(stack, req, res);
        for (Iterator iterator = standardMap.entrySet().iterator(); iterator.hasNext(); ) {
            Map.Entry entry = (Map.Entry) iterator.next();
            context.put((String) entry.getKey(), entry.getValue());
        }


        context.put("utils", new com.taobao.rigel.rap.common.utils.StringUtils());
        context.put("dateUtils", new DateUtils());
        context.put("consts", new SystemConstant());
        context.put("logger", new SystemVisitorLog());
        context.put(STRUTS, new VelocityStrutsUtil(velocityEngine, context, stack, req, res));


        ServletContext ctx = null;
        try {
            ctx = ServletActionContext.getServletContext();
        } catch (NullPointerException npe) {
            // in case this was used outside the lifecycle of struts servlet
            if (LOG.isDebugEnabled()) {
                LOG.debug("internal toolbox context ignored");
            }
        }

        if (toolboxManager != null && ctx != null) {
            ChainedContext chained = new ChainedContext(context, velocityEngine, req, res, ctx);
            chained.setToolbox(toolboxManager.getToolbox(chained));
            result = chained;
        } else {
            result = context;
        }

        req.setAttribute(KEY_VELOCITY_STRUTS_CONTEXT, result);
        return result;
    }

    /**
     * constructs contexts for chaining on this request.  This method does not
     * perform any initialization of the contexts.  All that must be done in the
     * context itself.
     *
     * @param servletRequest
     * @param servletResponse
     * @param extraContext
     * @return an VelocityContext[] of contexts to chain
     */
    protected VelocityContext[] prepareChainedContexts(HttpServletRequest servletRequest, HttpServletResponse servletResponse, Map extraContext) {
        if (this.chainedContextNames == null) {
            return null;
        }
        List contextList = new ArrayList();
        for (int i = 0; i < chainedContextNames.length; i++) {
            String className = chainedContextNames[i];
            try {
                VelocityContext velocityContext = (VelocityContext) objectFactory.buildBean(className, null);
                contextList.add(velocityContext);
            } catch (Exception e) {
                if (LOG.isWarnEnabled()) {
                    LOG.warn("Warning.  " + e.getClass().getName() + " caught while attempting to instantiate a chained VelocityContext, " + className + " -- skipping");
                }
            }
        }
        if (contextList.size() > 0) {
            VelocityContext[] extraContexts = new VelocityContext[contextList.size()];
            contextList.toArray(extraContexts);
            return extraContexts;
        } else {
            return null;
        }
    }

    /**
     * initializes the VelocityManager.  this should be called during the initialization process, say by
     * ServletDispatcher.  this may be called multiple times safely although calls beyond the first won't do anything
     *
     * @param context the current servlet context
     */
    public synchronized void init(ServletContext context) {
        if (velocityEngine == null) {
            velocityEngine = newVelocityEngine(context);
        }
        this.initToolbox(context);
    }

    /**
     * load optional velocity properties using the following loading strategy
     * <ul>
     * <li>relative to the servlet context path</li>
     * <li>relative to the WEB-INF directory</li>
     * <li>on the classpath</li>
     * </ul>
     *
     * @param context the current ServletContext.  may <b>not</b> be null
     * @return the optional properties if struts.velocity.configfile was specified, an empty Properties file otherwise
     */
    public Properties loadConfiguration(ServletContext context) {
        if (context == null) {
            String gripe = "Error attempting to create a loadConfiguration from a null ServletContext!";
            LOG.error(gripe);
            throw new IllegalArgumentException(gripe);
        }

        Properties properties = new Properties();

        // now apply our systemic defaults, then allow user to override
        applyDefaultConfiguration(context, properties);


        String defaultUserDirective = properties.getProperty("userdirective");

        /**
         * if the user has specified an external velocity configuration file, we'll want to search for it in the
         * following order
         *
         * 1. relative to the context path
         * 2. relative to /WEB-INF
         * 3. in the class path
         */
        String configfile;

        if (customConfigFile != null) {
            configfile = customConfigFile;
        } else {
            configfile = "velocity.properties";
        }

        configfile = configfile.trim();

        InputStream in = null;
        String resourceLocation = null;

        try {
            if (context.getRealPath(configfile) != null) {
                // 1. relative to context path, i.e. /velocity.properties
                String filename = context.getRealPath(configfile);

                if (filename != null) {
                    File file = new File(filename);

                    if (file.isFile()) {
                        resourceLocation = file.getCanonicalPath() + " from file system";
                        in = new FileInputStream(file);
                    }

                    // 2. if nothing was found relative to the context path, search relative to the WEB-INF directory
                    if (in == null) {
                        file = new File(context.getRealPath("/WEB-INF/" + configfile));

                        if (file.isFile()) {
                            resourceLocation = file.getCanonicalPath() + " from file system";
                            in = new FileInputStream(file);
                        }
                    }
                }
            }

            // 3. finally, if there's no physical file, how about something in our classpath
            if (in == null) {
                in = VelocityManager.class.getClassLoader().getResourceAsStream(configfile);
                if (in != null) {
                    resourceLocation = configfile + " from classloader";
                }
            }

            // if we've got something, load 'er up
            if (in != null) {
                if (LOG.isInfoEnabled()) {
                    LOG.info("Initializing velocity using " + resourceLocation);
                }
                properties.load(in);
            }
        } catch (IOException e) {
            if (LOG.isWarnEnabled()) {
                LOG.warn("Unable to load velocity configuration " + resourceLocation, e);
            }
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                }
            }
        }

        // overide with programmatically set properties
        if (this.velocityProperties != null) {
            Iterator keys = this.velocityProperties.keySet().iterator();
            while (keys.hasNext()) {
                String key = (String) keys.next();
                properties.setProperty(key, this.velocityProperties.getProperty(key));
            }
        }

        String userdirective = properties.getProperty("userdirective");

        if ((userdirective == null) || userdirective.trim().equals("")) {
            userdirective = defaultUserDirective;
        } else {
            userdirective = userdirective.trim() + "," + defaultUserDirective;
        }

        properties.setProperty("userdirective", userdirective);


        // for debugging purposes, allows users to dump out the properties that have been configured
        if (LOG.isDebugEnabled()) {
            LOG.debug("Initializing Velocity with the following properties ...");

            for (Iterator iter = properties.keySet().iterator();
                 iter.hasNext(); ) {
                String key = (String) iter.next();
                String value = properties.getProperty(key);

                if (LOG.isDebugEnabled()) {
                    LOG.debug("    '" + key + "' = '" + value + "'");
                }
            }
        }

        return properties;
    }

    @Inject(StrutsConstants.STRUTS_VELOCITY_CONFIGFILE)
    public void setCustomConfigFile(String val) {
        this.customConfigFile = val;
    }

    @Inject(StrutsConstants.STRUTS_VELOCITY_TOOLBOXLOCATION)
    public void setToolBoxLocation(String toolboxLocation) {
        this.toolBoxLocation = toolboxLocation;
    }

    public ToolboxManager getToolboxManager() {
        return toolboxManager;
    }

    /**
     * allow users to specify via the struts.properties file a set of additional VelocityContexts to chain to the
     * the StrutsVelocityContext.  The intent is to allow these contexts to store helper objects that the ui
     * developer may want access to.  Examples of reasonable VelocityContexts would be an IoCVelocityContext, a
     * SpringReferenceVelocityContext, and a ToolboxVelocityContext
     */
    @Inject(StrutsConstants.STRUTS_VELOCITY_CONTEXTS)
    public void setChainedContexts(String contexts) {
        // we expect contexts to be a comma separated list of classnames
        StringTokenizer st = new StringTokenizer(contexts, ",");
        List<String> contextList = new ArrayList<String>();

        while (st.hasMoreTokens()) {
            String classname = st.nextToken();
            contextList.add(classname);
        }
        if (contextList.size() > 0) {
            String[] chainedContexts = new String[contextList.size()];
            contextList.toArray(chainedContexts);
            this.chainedContextNames = chainedContexts;
        }
    }

    /**
     * Initializes the ServletToolboxManager for this servlet's
     * toolbox (if any).
     */
    protected void initToolbox(ServletContext context) {
        /* if we have a toolbox, get a manager for it */
        if (StringUtils.isNotBlank(toolBoxLocation)) {
            toolboxManager = ServletToolboxManager.getInstance(context, toolBoxLocation);
        } else {
            Velocity.info("VelocityViewServlet: No toolbox entry in configuration.");
        }
    }

    /**
     * <p/>
     * Instantiates a new VelocityEngine.
     * </p>
     * <p/>
     * The following is the default Velocity configuration
     * </p>
     * <pre>
     *  resource.loader = file, class
     *  file.resource.loader.path = real path of webapp
     *  class.resource.loader.description = Velocity Classpath Resource Loader
     *  class.resource.loader.class = org.apache.struts2.views.velocity.StrutsResourceLoader
     * </pre>
     * <p/>
     * this default configuration can be overridden by specifying a struts.velocity.configfile property in the
     * struts.properties file.  the specified config file will be searched for in the following order:
     * </p>
     * <ul>
     * <li>relative to the servlet context path</li>
     * <li>relative to the WEB-INF directory</li>
     * <li>on the classpath</li>
     * </ul>
     *
     * @param context the current ServletContext.  may <b>not</b> be null
     */
    protected VelocityEngine newVelocityEngine(ServletContext context) {
        if (context == null) {
            String gripe = "Error attempting to create a new VelocityEngine from a null ServletContext!";
            LOG.error(gripe);
            throw new IllegalArgumentException(gripe);
        }

        Properties p = loadConfiguration(context);

        VelocityEngine velocityEngine = new VelocityEngine();

        //  Set the velocity attribute for the servlet context
        //  if this is not set the webapp loader WILL NOT WORK
        velocityEngine.setApplicationAttribute(ServletContext.class.getName(),
                context);

        try {
            velocityEngine.init(p);
        } catch (Exception e) {
            throw new StrutsException("Unable to instantiate VelocityEngine!", e);
        }

        return velocityEngine;
    }

    /**
     * once we've loaded up the user defined configurations, we will want to apply Struts specification configurations.
     * <ul>
     * <li>if Velocity.RESOURCE_LOADER has not been defined, then we will use the defaults which is a joined file,
     * class loader for unpackaed wars and a straight class loader otherwise</li>
     * <li>we need to define the various Struts custom user directives such as #param, #tag, and #bodytag</li>
     * </ul>
     *
     * @param context
     * @param p
     */
    private void applyDefaultConfiguration(ServletContext context, Properties p) {
        // ensure that caching isn't overly aggressive

        /**
         * Load a default resource loader definition if there isn't one present.
         * Ben Hall (22/08/2003)
         */
        if (p.getProperty(Velocity.RESOURCE_LOADER) == null) {
            p.setProperty(Velocity.RESOURCE_LOADER, "strutsfile, strutsclass");
        }

        /**
         * If there's a "real" path add it for the strutsfile resource loader.
         * If there's no real path and they haven't configured a loader then we change
         * resource loader property to just use the strutsclass loader
         * Ben Hall (22/08/2003)
         */
        if (context.getRealPath("") != null) {
            p.setProperty("strutsfile.resource.loader.description", "Velocity File Resource Loader");
            p.setProperty("strutsfile.resource.loader.class", "org.apache.velocity.runtime.resource.loader.FileResourceLoader");
            p.setProperty("strutsfile.resource.loader.path", context.getRealPath(""));
            p.setProperty("strutsfile.resource.loader.modificationCheckInterval", "2");
            p.setProperty("strutsfile.resource.loader.cache", "true");
        } else {
            // remove strutsfile from resource loader property
            String prop = p.getProperty(Velocity.RESOURCE_LOADER);
            if (prop.indexOf("strutsfile,") != -1) {
                prop = replace(prop, "strutsfile,", "");
            } else if (prop.indexOf(", strutsfile") != -1) {
                prop = replace(prop, ", strutsfile", "");
            } else if (prop.indexOf("strutsfile") != -1) {
                prop = replace(prop, "strutsfile", "");
            }

            p.setProperty(Velocity.RESOURCE_LOADER, prop);
        }

        /**
         * Refactored the Velocity templates for the Struts taglib into the classpath from the web path.  This will
         * enable Struts projects to have access to the templates by simply including the Struts jar file.
         * Unfortunately, there does not appear to be a macro for the class loader keywords
         * Matt Ho - Mon Mar 17 00:21:46 PST 2003
         */
        p.setProperty("strutsclass.resource.loader.description", "Velocity Classpath Resource Loader");
        p.setProperty("strutsclass.resource.loader.class", "org.apache.struts2.views.velocity.StrutsResourceLoader");
        p.setProperty("strutsclass.resource.loader.modificationCheckInterval", "2");
        p.setProperty("strutsclass.resource.loader.cache", "true");

        // components
        StringBuilder sb = new StringBuilder();

        for (TagLibraryDirectiveProvider tagLibrary : tagLibraries) {
            List<Class> directives = tagLibrary.getDirectiveClasses();
            for (Class directive : directives) {
                addDirective(sb, directive);
            }
        }

        for (TagLibrary tagLibrary : oldTagLibraries) {
            List<Class> directives = tagLibrary.getVelocityDirectiveClasses();
            for (Class directive : directives) {
                addDirective(sb, directive);
            }
        }

        String directives = sb.toString();

        String userdirective = p.getProperty("userdirective");
        if ((userdirective == null) || userdirective.trim().equals("")) {
            userdirective = directives;
        } else {
            userdirective = userdirective.trim() + "," + directives;
        }

        p.setProperty("userdirective", userdirective);
    }

    private void addDirective(StringBuilder sb, Class clazz) {
        sb.append(clazz.getName()).append(",");
    }

    /**
     * @return the velocityProperties
     */
    public Properties getVelocityProperties() {
        return velocityProperties;
    }

    /**
     * @param velocityProperties the velocityProperties to set
     */
    public void setVelocityProperties(Properties velocityProperties) {
        this.velocityProperties = velocityProperties;
    }
}
