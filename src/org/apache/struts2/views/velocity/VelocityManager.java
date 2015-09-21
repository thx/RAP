//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package org.apache.struts2.views.velocity;

import com.opensymphony.xwork2.ObjectFactory;
import com.opensymphony.xwork2.inject.Container;
import com.opensymphony.xwork2.inject.Inject;
import com.opensymphony.xwork2.util.ValueStack;
import com.opensymphony.xwork2.util.logging.Logger;
import com.opensymphony.xwork2.util.logging.LoggerFactory;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.Map.Entry;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsException;
import org.apache.struts2.util.VelocityStrutsUtil;
import org.apache.struts2.views.TagLibrary;
import org.apache.struts2.views.TagLibraryDirectiveProvider;
import org.apache.struts2.views.util.ContextUtil;
import org.apache.struts2.views.velocity.StrutsVelocityContext;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.context.Context;
import org.apache.velocity.tools.view.ToolboxManager;
import org.apache.velocity.tools.view.context.ChainedContext;
import org.apache.velocity.tools.view.servlet.ServletToolboxManager;

public class VelocityManager {
    private static final Logger LOG = LoggerFactory.getLogger(VelocityManager.class);
    public static final String STRUTS = "struts";
    private ObjectFactory objectFactory;
    public static final String KEY_VELOCITY_STRUTS_CONTEXT = ".KEY_velocity.struts2.context";
    public static final String PARENT = "parent";
    public static final String TAG = "tag";
    private VelocityEngine velocityEngine;
    protected ToolboxManager toolboxManager = null;
    private String toolBoxLocation;
    private String[] chainedContextNames;
    private Properties velocityProperties;
    private String customConfigFile;
    private List<TagLibraryDirectiveProvider> tagLibraries;
    private List<TagLibrary> oldTagLibraries;

    public VelocityManager() {
    }

    @Inject
    public void setObjectFactory(ObjectFactory fac) {
        this.objectFactory = fac;
    }

    @Inject
    public void setContainer(Container container) {
        ArrayList list = new ArrayList();
        Set prefixes = container.getInstanceNames(TagLibraryDirectiveProvider.class);
        Iterator oldList = prefixes.iterator();

        while(oldList.hasNext()) {
            String oldPrefixes = (String)oldList.next();
            list.add(container.getInstance(TagLibraryDirectiveProvider.class, oldPrefixes));
        }

        this.tagLibraries = Collections.unmodifiableList(list);
        ArrayList oldList1 = new ArrayList();
        Set oldPrefixes1 = container.getInstanceNames(TagLibrary.class);
        Iterator i$ = oldPrefixes1.iterator();

        while(i$.hasNext()) {
            String prefix = (String)i$.next();
            oldList1.add(container.getInstance(TagLibrary.class, prefix));
        }

        this.oldTagLibraries = Collections.unmodifiableList(oldList1);
    }

    public VelocityEngine getVelocityEngine() {
        return this.velocityEngine;
    }

    public Context createContext(ValueStack stack, HttpServletRequest req, HttpServletResponse res) {
        Object result = null;
        VelocityContext[] chainedContexts = this.prepareChainedContexts(req, res, stack.getContext());
        StrutsVelocityContext context = new StrutsVelocityContext(chainedContexts, stack);
        Map standardMap = ContextUtil.getStandardContext(stack, req, res);
        Iterator ctx = standardMap.entrySet().iterator();

        while(ctx.hasNext()) {
            Entry chained = (Entry)ctx.next();
            context.put((String)chained.getKey(), chained.getValue());
        }

        context.put("struts", new VelocityStrutsUtil(this.velocityEngine, context, stack, req, res));
        ServletContext ctx1 = null;

        try {
            ctx1 = ServletActionContext.getServletContext();
        } catch (NullPointerException var10) {
            if(LOG.isDebugEnabled()) {
                LOG.debug("internal toolbox context ignored", new String[0]);
            }
        }

        if(this.toolboxManager != null && ctx1 != null) {
            ChainedContext chained1 = new ChainedContext(context, this.velocityEngine, req, res, ctx1);
            chained1.setToolbox(this.toolboxManager.getToolbox(chained1));
            result = chained1;
        } else {
            result = context;
        }

        req.setAttribute(".KEY_velocity.struts2.context", result);
        return (Context)result;
    }

    protected VelocityContext[] prepareChainedContexts(HttpServletRequest servletRequest, HttpServletResponse servletResponse, Map extraContext) {
        if(this.chainedContextNames == null) {
            return null;
        } else {
            ArrayList contextList = new ArrayList();

            for(int extraContexts = 0; extraContexts < this.chainedContextNames.length; ++extraContexts) {
                String className = this.chainedContextNames[extraContexts];

                try {
                    VelocityContext e = (VelocityContext)this.objectFactory.buildBean(className, (Map)null);
                    contextList.add(e);
                } catch (Exception var8) {
                    if(LOG.isWarnEnabled()) {
                        LOG.warn("Warning.  " + var8.getClass().getName() + " caught while attempting to instantiate a chained VelocityContext, " + className + " -- skipping", new String[0]);
                    }
                }
            }

            if(contextList.size() > 0) {
                VelocityContext[] var9 = new VelocityContext[contextList.size()];
                contextList.toArray(var9);
                return var9;
            } else {
                return null;
            }
        }
    }

    public synchronized void init(ServletContext context) {
        if(this.velocityEngine == null) {
            this.velocityEngine = this.newVelocityEngine(context);
        }

        this.initToolbox(context);
    }

    public Properties loadConfiguration(ServletContext context) {
        if(context == null) {
            String properties1 = "Error attempting to create a loadConfiguration from a null ServletContext!";
            LOG.error(properties1, new String[0]);
            throw new IllegalArgumentException(properties1);
        } else {
            Properties properties = new Properties();
            this.applyDefaultConfiguration(context, properties);
            String defaultUserDirective = properties.getProperty("userdirective");
            String configfile;
            if(this.customConfigFile != null) {
                configfile = this.customConfigFile;
            } else {
                configfile = "velocity.properties";
            }

            configfile = configfile.trim();
            Object in = null;
            String resourceLocation = null;

            String userdirective;
            try {
                if(context.getRealPath(configfile) != null) {
                    userdirective = context.getRealPath(configfile);
                    if(userdirective != null) {
                        File iter = new File(userdirective);
                        if(iter.isFile()) {
                            resourceLocation = iter.getCanonicalPath() + " from file system";
                            in = new FileInputStream(iter);
                        }

                        if(in == null) {
                            iter = new File(context.getRealPath("/WEB-INF/" + configfile));
                            if(iter.isFile()) {
                                resourceLocation = iter.getCanonicalPath() + " from file system";
                                in = new FileInputStream(iter);
                            }
                        }
                    }
                }

                if(in == null) {
                    in = VelocityManager.class.getClassLoader().getResourceAsStream(configfile);
                    if(in != null) {
                        resourceLocation = configfile + " from classloader";
                    }
                }

                if(in != null) {
                    if(LOG.isInfoEnabled()) {
                        LOG.info("Initializing velocity using " + resourceLocation, new String[0]);
                    }

                    properties.load((InputStream)in);
                }
            } catch (IOException var17) {
                if(LOG.isWarnEnabled()) {
                    LOG.warn("Unable to load velocity configuration " + resourceLocation, var17, new String[0]);
                }
            } finally {
                if(in != null) {
                    try {
                        ((InputStream)in).close();
                    } catch (IOException var16) {
                        ;
                    }
                }

            }

            if(this.velocityProperties != null) {
                Iterator userdirective1 = this.velocityProperties.keySet().iterator();

                while(userdirective1.hasNext()) {
                    String iter1 = (String)userdirective1.next();
                    properties.setProperty(iter1, this.velocityProperties.getProperty(iter1));
                }
            }

            userdirective = properties.getProperty("userdirective");
            if(userdirective != null && !userdirective.trim().equals("")) {
                userdirective = userdirective.trim() + "," + defaultUserDirective;
            } else {
                userdirective = defaultUserDirective;
            }

            properties.setProperty("userdirective", userdirective);
            if(LOG.isDebugEnabled()) {
                LOG.debug("Initializing Velocity with the following properties ...", new String[0]);
                Iterator iter2 = properties.keySet().iterator();

                while(iter2.hasNext()) {
                    String key = (String)iter2.next();
                    String value = properties.getProperty(key);
                    if(LOG.isDebugEnabled()) {
                        LOG.debug("    \'" + key + "\' = \'" + value + "\'", new String[0]);
                    }
                }
            }

            return properties;
        }
    }

    @Inject("struts.velocity.configfile")
    public void setCustomConfigFile(String val) {
        this.customConfigFile = val;
    }

    @Inject("struts.velocity.toolboxlocation")
    public void setToolBoxLocation(String toolboxLocation) {
        this.toolBoxLocation = toolboxLocation;
    }

    public ToolboxManager getToolboxManager() {
        return this.toolboxManager;
    }

    @Inject("struts.velocity.contexts")
    public void setChainedContexts(String contexts) {
        StringTokenizer st = new StringTokenizer(contexts, ",");
        ArrayList contextList = new ArrayList();

        while(st.hasMoreTokens()) {
            String chainedContexts = st.nextToken();
            contextList.add(chainedContexts);
        }

        if(contextList.size() > 0) {
            String[] chainedContexts1 = new String[contextList.size()];
            contextList.toArray(chainedContexts1);
            this.chainedContextNames = chainedContexts1;
        }

    }

    protected void initToolbox(ServletContext context) {
        if(StringUtils.isNotBlank(this.toolBoxLocation)) {
            this.toolboxManager = ServletToolboxManager.getInstance(context, this.toolBoxLocation);
        } else {
            Velocity.info("VelocityViewServlet: No toolbox entry in configuration.");
        }

    }

    protected VelocityEngine newVelocityEngine(ServletContext context) {
        if(context == null) {
            String p1 = "Error attempting to create a new VelocityEngine from a null ServletContext!";
            LOG.error(p1, new String[0]);
            throw new IllegalArgumentException(p1);
        } else {
            Properties p = this.loadConfiguration(context);
            VelocityEngine velocityEngine = new VelocityEngine();
            velocityEngine.setApplicationAttribute(ServletContext.class.getName(), context);

            try {
                velocityEngine.init(p);
                return velocityEngine;
            } catch (Exception var5) {
                throw new StrutsException("Unable to instantiate VelocityEngine!", var5);
            }
        }
    }

    private void applyDefaultConfiguration(ServletContext context, Properties p) {
        if(p.getProperty("resource.loader") == null) {
            p.setProperty("resource.loader", "strutsfile, strutsclass");
        }

        if(context.getRealPath("") != null) {
            p.setProperty("strutsfile.resource.loader.description", "Velocity File Resource Loader");
            p.setProperty("strutsfile.resource.loader.class", "org.apache.velocity.runtime.resource.loader.FileResourceLoader");
            p.setProperty("strutsfile.resource.loader.path", context.getRealPath(""));
            p.setProperty("strutsfile.resource.loader.modificationCheckInterval", "2");
            p.setProperty("strutsfile.resource.loader.cache", "true");
        } else {
            String sb = p.getProperty("resource.loader");
            if(sb.indexOf("strutsfile,") != -1) {
                sb = replace(sb, "strutsfile,", "");
            } else if(sb.indexOf(", strutsfile") != -1) {
                sb = replace(sb, ", strutsfile", "");
            } else if(sb.indexOf("strutsfile") != -1) {
                sb = replace(sb, "strutsfile", "");
            }

            p.setProperty("resource.loader", sb);
        }

        p.setProperty("strutsclass.resource.loader.description", "Velocity Classpath Resource Loader");
        p.setProperty("strutsclass.resource.loader.class", "org.apache.struts2.views.velocity.StrutsResourceLoader");
        p.setProperty("strutsclass.resource.loader.modificationCheckInterval", "2");
        p.setProperty("strutsclass.resource.loader.cache", "true");
        StringBuilder sb1 = new StringBuilder();
        Iterator directives = this.tagLibraries.iterator();

        List directives1;
        Iterator i$;
        Class directive;
        while(directives.hasNext()) {
            TagLibraryDirectiveProvider userdirective = (TagLibraryDirectiveProvider)directives.next();
            directives1 = userdirective.getDirectiveClasses();
            i$ = directives1.iterator();

            while(i$.hasNext()) {
                directive = (Class)i$.next();
                this.addDirective(sb1, directive);
            }
        }

        directives = this.oldTagLibraries.iterator();

        while(directives.hasNext()) {
            TagLibrary userdirective1 = (TagLibrary)directives.next();
            directives1 = userdirective1.getVelocityDirectiveClasses();
            i$ = directives1.iterator();

            while(i$.hasNext()) {
                directive = (Class)i$.next();
                this.addDirective(sb1, directive);
            }
        }

        String directives2 = sb1.toString();
        String userdirective2 = p.getProperty("userdirective");
        if(userdirective2 != null && !userdirective2.trim().equals("")) {
            userdirective2 = userdirective2.trim() + "," + directives2;
        } else {
            userdirective2 = directives2;
        }

        p.setProperty("userdirective", userdirective2);
    }

    private void addDirective(StringBuilder sb, Class clazz) {
        sb.append(clazz.getName()).append(",");
    }

    private static final String replace(String string, String oldString, String newString) {
        if(string == null) {
            return null;
        } else if(newString == null) {
            return string;
        } else {
            byte i = 0;
            int i1;
            if((i1 = string.indexOf(oldString, i)) < 0) {
                return string;
            } else {
                char[] string2 = string.toCharArray();
                char[] newString2 = newString.toCharArray();
                int oLength = oldString.length();
                StringBuilder buf = new StringBuilder(string2.length);
                buf.append(string2, 0, i1).append(newString2);
                i1 += oLength;

                int j;
                for(j = i1; (i1 = string.indexOf(oldString, i1)) > 0; j = i1) {
                    buf.append(string2, j, i1 - j).append(newString2);
                    i1 += oLength;
                }

                buf.append(string2, j, string2.length - j);
                return buf.toString();
            }
        }
    }

    public Properties getVelocityProperties() {
        return this.velocityProperties;
    }

    public void setVelocityProperties(Properties velocityProperties) {
        this.velocityProperties = velocityProperties;
    }
}
