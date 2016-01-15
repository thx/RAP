package com.taobao.rigel.rap.workspace.service.impl;

import com.google.gson.Gson;
import com.taobao.rigel.rap.project.bo.*;
import com.taobao.rigel.rap.project.dao.ProjectDao;
import com.taobao.rigel.rap.workspace.bo.CheckIn;
import com.taobao.rigel.rap.workspace.bo.Workspace;
import com.taobao.rigel.rap.workspace.dao.WorkspaceDao;
import com.taobao.rigel.rap.workspace.service.WorkspaceMgr;
import java.util.Iterator;

public class WorkspaceMgrImpl implements WorkspaceMgr {

    private WorkspaceDao workspaceDao;
    private ProjectDao projectDao;

    public WorkspaceDao getWorkspaceDao() {
        return this.workspaceDao;
    }

    public void setWorkspaceDao(WorkspaceDao workspaceDao) {
        this.workspaceDao = workspaceDao;
    }

    public ProjectDao getProjectDao() {
        return projectDao;
    }

    public void setProjectDao(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    public Workspace getWorkspace(int projectId, int userId) {
        Workspace workspace = workspaceDao.getWorkspace(projectId, userId);
        return workspace;
    }

    public void updateWorkspace(Workspace workspace) {
        workspaceDao.updateWorkspace(workspace);

    }

    public Workspace getWorkspace(int id) {
        return workspaceDao.getWorkspace(id);
    }

    public String checkIn(String[] jsonList, int userId, int projectId) {
        //[TODO] does user has access?
        StringBuilder log = new StringBuilder();
        Project projectClient, projectOriginal, projectServer;
        Gson gson = new Gson();
        // get server workspace
        projectServer = projectDao.getProjectSummary(projectId);
        // parse client workspace
        projectClient = gson.fromJson(jsonList[0], Project.class);
        // parse original client workspace
        projectOriginal = gson.fromJson(jsonList[1], Project.class);

        /**
         *  start processing ...
         *  update a(client) => b(server) compared with o (Original)
         */

        // search moduleList
        Iterator<Module> moduleIterator = projectClient.getModuleList().iterator();
        while (moduleIterator.hasNext()) {
            Module moduleA = moduleIterator.next();
            // scan module
            Module moduleB = findModule(projectServer, moduleA.getId());
            if (moduleB == null) {
                log.append(logTemplate(moduleA.getId(), "module", "add", null, null, null));
                projectServer.getModuleList().add(moduleA);
                continue;
            }
            Module moduleO = findModule(projectOriginal, moduleA.getId());
            if (!moduleA.getName().equals(moduleB.getName())) {
                boolean aChanged = (!moduleA.getName().equals(moduleO.getName()));
                boolean bChanged = (!moduleB.getName().equals(moduleO.getName()));

                if (aChanged && bChanged) {
                    // [TODO] conflict!
                } else if (aChanged && !bChanged) {
                    // update
                    log.append(logTemplate(moduleB.getId(), "module", "update",
                            moduleA.getName(), moduleB.getName(), "name"));
                    moduleB.setName(moduleA.getName());
                } else if (!aChanged && bChanged) {
                    // ignore
                }
            }
            if (!moduleA.getIntroduction().equals(moduleB.getIntroduction())) {
                boolean aChanged = (!moduleA.getIntroduction().equals(moduleO.getIntroduction()));
                boolean bChanged = (!moduleB.getIntroduction().equals(moduleO.getIntroduction()));

                if (aChanged && bChanged) {
                    // [TODO] conflict!
                } else if (aChanged && !bChanged) {
                    // update
                    log.append(logTemplate(moduleB.getId(), "module", "update",
                            moduleA.getIntroduction(), moduleB.getIntroduction(), "introduction"));
                    moduleB.setIntroduction(moduleA.getIntroduction());
                } else if (!aChanged && bChanged) {
                    // ignore
                }
            }
            // search pageList
            Iterator<Page> pageIterator = moduleA.getPageList().iterator();
            while (pageIterator.hasNext()) {
                Page pageA = pageIterator.next();
                // scan page
                Page pageB = findPage(projectServer, pageA.getId());
                if (pageB == null) {
                    moduleB.getPageList().add(pageA);
                    continue;
                }
                Page pageO = findPage(projectOriginal, pageA.getId());
                if (!pageA.getName().equals(pageB.getName())) {
                    boolean aChanged = (!pageA.getName().equals(pageO.getName()));
                    boolean bChanged = (!pageB.getName().equals(pageO.getName()));

                    if (aChanged && bChanged) {
                        // [TODO] conflict!
                    } else if (aChanged && !bChanged) {
                        // update
                        log.append(logTemplate(pageB.getId(), "page", "update",
                                pageA.getName(), pageB.getName(), "name"));
                        pageB.setName(pageA.getName());
                    } else if (!aChanged && bChanged) {
                        // ignore
                    }
                }
                if (!pageA.getIntroduction().equals(pageB.getIntroduction())) {
                    boolean aChanged = (!pageA.getIntroduction().equals(pageO.getIntroduction()));
                    boolean bChanged = (!pageB.getIntroduction().equals(pageO.getIntroduction()));

                    if (aChanged && bChanged) {
                        // [TODO] conflict!
                    } else if (aChanged && !bChanged) {
                        // update
                        log.append(logTemplate(pageB.getId(), "page", "update",
                                pageA.getIntroduction(), pageB.getIntroduction(), "introduction"));
                        pageB.setIntroduction(pageA.getIntroduction());
                    } else if (!aChanged && bChanged) {
                        // ignore
                    }
                }
                // search actionList
                Iterator<Action> actionIterator = pageA.getActionList().iterator();
                while (actionIterator.hasNext()) {
                    Action actionA = actionIterator.next();
                    // scan action
                    Action actionB = findAction(projectServer, actionA.getId());
                    if (actionB == null) {
                        pageB.getActionList().add(actionA);
                        continue;
                    }

                    Action actionO = findAction(projectOriginal, actionA.getId());
                    if (!actionA.getName().equals(actionB.getName())) {
                        boolean aChanged = (!actionA.getName().equals(actionO.getName()));
                        boolean bChanged = (!actionB.getName().equals(actionO.getName()));

                        if (aChanged && bChanged) {
                            // [TODO] conflict!
                        } else if (aChanged && !bChanged) {
                            // update
                            log.append(logTemplate(Integer.parseInt(new Integer(actionB.getId()).toString()), "action", "update",
                                    actionA.getName(), actionB.getName(), "name"));
                            actionB.setName(actionA.getName());
                        } else if (!aChanged && bChanged) {
                            // ignore
                        }
                    }
                    if (!actionA.getDescription().equals(actionB.getDescription())) {
                        boolean aChanged = (!actionA.getDescription().equals(actionO.getDescription()));
                        boolean bChanged = (!actionB.getDescription().equals(actionO.getDescription()));

                        if (aChanged && bChanged) {
                            // [TODO] conflict!
                        } else if (aChanged && !bChanged) {
                            // update
                            log.append(logTemplate(Integer.parseInt(new Integer(actionB.getId()).toString()), "action", "update",
                                    actionA.getDescription(), actionB.getDescription(), "description"));
                            actionB.setDescription(actionA.getDescription());
                        } else if (!aChanged && bChanged) {
                            // ignore
                        }
                    }
                    if (!actionA.getRequestType().equals(actionB.getRequestType())) {
                        boolean aChanged = (!actionA.getRequestType().equals(actionO.getRequestType()));
                        boolean bChanged = (!actionB.getRequestType().equals(actionO.getRequestType()));

                        if (aChanged && bChanged) {
                            // [TODO] conflict!
                        } else if (aChanged && !bChanged) {
                            // update
                            log.append(logTemplate(Integer.parseInt(new Integer(actionB.getId()).toString()), "action", "update",
                                    actionA.getRequestType(), actionB.getRequestType(), "requestType"));
                            actionB.setRequestType(actionA.getRequestType());
                        } else if (!aChanged && bChanged) {
                            // ignore
                        }
                    }
                    if (!actionA.getRequestUrl().equals(actionB.getRequestUrl())) {
                        boolean aChanged = (!actionA.getRequestUrl().equals(actionO.getRequestUrl()));
                        boolean bChanged = (!actionB.getRequestUrl().equals(actionO.getRequestUrl()));

                        if (aChanged && bChanged) {
                            // [TODO] conflict!
                        } else if (aChanged && !bChanged) {
                            // update
                            log.append(logTemplate(Integer.parseInt(new Integer(actionB.getId()).toString()), "action", "update",
                                    actionA.getRequestUrl(), actionB.getRequestUrl(), "requestUrl"));
                            actionB.setRequestUrl(actionA.getRequestUrl());
                        } else if (!aChanged && bChanged) {
                            // ignore
                        }
                    }
                    if (!actionA.getResponseTemplate().equals(actionB.getResponseTemplate())) {
                        boolean aChanged = (!actionA.getResponseTemplate().equals(actionO.getResponseTemplate()));
                        boolean bChanged = (!actionB.getResponseTemplate().equals(actionO.getResponseTemplate()));

                        if (aChanged && bChanged) {
                            // [TODO] conflict!
                        } else if (aChanged && !bChanged) {
                            // update
                            log.append(logTemplate(Integer.parseInt(new Integer(actionB.getId()).toString()), "action", "update",
                                    actionA.getResponseTemplate(), actionB.getResponseTemplate(), "responseTemplate"));
                            actionB.setResponseTemplate(actionA.getResponseTemplate());
                        } else if (!aChanged && bChanged) {
                            // ignore
                        }
                    }
                    // search requestParameterList
                    Iterator<Parameter> requestParameterIterator = actionA.getRequestParameterList().iterator();
                    while (requestParameterIterator.hasNext()) {
                        Parameter parameterA = requestParameterIterator.next();
                        // scan request parameter
                        Parameter parameterB = findParameter(projectServer, parameterA.getId(), true);
                        if (parameterB == null) {
                            actionB.getRequestParameterList().add(parameterA);
                            continue;
                        }
                        Parameter parameterO = findParameter(projectOriginal, parameterA.getId(), true);
                        processParameter(parameterA, parameterB, parameterO, log);
                    }

                    // search responseParameterList
                    Iterator<Parameter> responseParameterIterator = actionA.getResponseParameterList().iterator();
                    while (responseParameterIterator.hasNext()) {
                        Parameter parameterA = responseParameterIterator.next();
                        // scan response parameter
                        Parameter parameterB = findParameter(projectClient, parameterA.getId(), false);
                        if (parameterB == null) {
                            actionB.getResponseParameterList().add(parameterA);
                            continue;
                        }
                        Parameter parameterO = findParameter(projectOriginal, parameterA.getId(), false);
                        processParameter(parameterA, parameterB, parameterO, log);
                    }
                }
            }

        }
        projectDao.updateProject(projectServer);
        projectServer = projectDao.getProjectSummary(projectId);
        return "{\"projectData\":" + projectServer.toString() + ", \"log\":\"" + log
                + "\", \"projectDataOriginal\":" + projectServer.toString() + "}";
    }


    public String checkOut(String[] jsonList, int userId, int projectId) {
        //[TODO] does user has access?

        StringBuilder log = new StringBuilder();
        Project projectClient, projectOriginal, projectServer;
        Gson gson = new Gson();
        // get server workspace
        projectServer = projectDao.getProjectSummary(projectId);
        // parse client workspace
        projectClient = gson.fromJson(jsonList[0], Project.class);
        // parse original client workspace
        projectOriginal = gson.fromJson(jsonList[1], Project.class);

        /**
         *  start processing ...
         *  update a(Server) => b(client) compared with o (Original)
         */

        // search moduleList
        Iterator<Module> moduleIterator = projectServer.getModuleList().iterator();
        while (moduleIterator.hasNext()) {
            Module moduleA = moduleIterator.next();
            // scan module
            Module moduleB = findModule(projectClient, moduleA.getId());
            if (moduleB == null) {
                log.append(logTemplate(moduleA.getId(), "module", "add", null, null, null));
                projectClient.getModuleList().add(moduleA);
                continue;
            }
            Module moduleO = findModule(projectOriginal, moduleA.getId());
            if (!moduleA.getName().equals(moduleB.getName())) {
                boolean aChanged = (!moduleA.getName().equals(moduleO.getName()));
                boolean bChanged = (!moduleB.getName().equals(moduleO.getName()));

                if (aChanged && bChanged) {
                    // [TODO] conflict!
                } else if (aChanged && !bChanged) {
                    // update
                    log.append(logTemplate(moduleB.getId(), "module", "update",
                            moduleA.getName(), moduleB.getName(), "name"));
                    moduleB.setName(moduleA.getName());
                } else if (!aChanged && bChanged) {
                    // ignore
                }
            }
            if (!moduleA.getIntroduction().equals(moduleB.getIntroduction())) {
                boolean aChanged = (!moduleA.getIntroduction().equals(moduleO.getIntroduction()));
                boolean bChanged = (!moduleB.getIntroduction().equals(moduleO.getIntroduction()));

                if (aChanged && bChanged) {
                    // [TODO] conflict!
                } else if (aChanged && !bChanged) {
                    // update
                    log.append(logTemplate(moduleB.getId(), "module", "update",
                            moduleA.getIntroduction(), moduleB.getIntroduction(), "introduction"));
                    moduleB.setIntroduction(moduleA.getIntroduction());
                } else if (!aChanged && bChanged) {
                    // ignore
                }
            }
            // search pageList
            Iterator<Page> pageIterator = moduleA.getPageList().iterator();
            while (pageIterator.hasNext()) {
                Page pageA = pageIterator.next();
                // scan page
                Page pageB = findPage(projectClient, pageA.getId());
                if (pageB == null) {
                    moduleB.getPageList().add(pageA);
                    continue;
                }
                Page pageO = findPage(projectOriginal, pageA.getId());
                if (!pageA.getName().equals(pageB.getName())) {
                    boolean aChanged = (!pageA.getName().equals(pageO.getName()));
                    boolean bChanged = (!pageB.getName().equals(pageO.getName()));

                    if (aChanged && bChanged) {
                        // [TODO] conflict!
                    } else if (aChanged && !bChanged) {
                        // update
                        log.append(logTemplate(pageB.getId(), "page", "update",
                                pageA.getName(), pageB.getName(), "name"));
                        pageB.setName(pageA.getName());
                    } else if (!aChanged && bChanged) {
                        // ignore
                    }
                }
                if (!pageA.getIntroduction().equals(pageB.getIntroduction())) {
                    boolean aChanged = (!pageA.getIntroduction().equals(pageO.getIntroduction()));
                    boolean bChanged = (!pageB.getIntroduction().equals(pageO.getIntroduction()));

                    if (aChanged && bChanged) {
                        // [TODO] conflict!
                    } else if (aChanged && !bChanged) {
                        // update
                        log.append(logTemplate(pageB.getId(), "page", "update",
                                pageA.getIntroduction(), pageB.getIntroduction(), "introduction"));
                        pageB.setIntroduction(pageA.getIntroduction());
                    } else if (!aChanged && bChanged) {
                        // ignore
                    }
                }
                // search actionList
                Iterator<Action> actionIterator = pageA.getActionList().iterator();
                while (actionIterator.hasNext()) {
                    Action actionA = actionIterator.next();
                    // scan action
                    Action actionB = findAction(projectClient, actionA.getId());
                    if (actionB == null) {
                        pageB.getActionList().add(actionA);
                        continue;
                    }

                    Action actionO = findAction(projectOriginal, actionA.getId());
                    if (!actionA.getName().equals(actionB.getName())) {
                        boolean aChanged = (!actionA.getName().equals(actionO.getName()));
                        boolean bChanged = (!actionB.getName().equals(actionO.getName()));

                        if (aChanged && bChanged) {
                            // [TODO] conflict!
                        } else if (aChanged && !bChanged) {
                            // update
                            log.append(logTemplate(Integer.parseInt(new Integer(actionB.getId()).toString()), "action", "update",
                                    actionA.getName(), actionB.getName(), "name"));
                            actionB.setName(actionA.getName());
                        } else if (!aChanged && bChanged) {
                            // ignore
                        }
                    }
                    if (!actionA.getDescription().equals(actionB.getDescription())) {
                        boolean aChanged = (!actionA.getDescription().equals(actionO.getDescription()));
                        boolean bChanged = (!actionB.getDescription().equals(actionO.getDescription()));

                        if (aChanged && bChanged) {
                            // [TODO] conflict!
                        } else if (aChanged && !bChanged) {
                            // update
                            log.append(logTemplate(Integer.parseInt(new Integer(actionB.getId()).toString()), "action", "update",
                                    actionA.getDescription(), actionB.getDescription(), "description"));
                            actionB.setDescription(actionA.getDescription());
                        } else if (!aChanged && bChanged) {
                            // ignore
                        }
                    }
                    if (!actionA.getRequestType().equals(actionB.getRequestType())) {
                        boolean aChanged = (!actionA.getRequestType().equals(actionO.getRequestType()));
                        boolean bChanged = (!actionB.getRequestType().equals(actionO.getRequestType()));

                        if (aChanged && bChanged) {
                            // [TODO] conflict!
                        } else if (aChanged && !bChanged) {
                            // update
                            log.append(logTemplate(Integer.parseInt(new Integer(actionB.getId()).toString()), "action", "update",
                                    actionA.getRequestType(), actionB.getRequestType(), "requestType"));
                            actionB.setRequestType(actionA.getRequestType());
                        } else if (!aChanged && bChanged) {
                            // ignore
                        }
                    }
                    if (!actionA.getRequestUrl().equals(actionB.getRequestUrl())) {
                        boolean aChanged = (!actionA.getRequestUrl().equals(actionO.getRequestUrl()));
                        boolean bChanged = (!actionB.getRequestUrl().equals(actionO.getRequestUrl()));

                        if (aChanged && bChanged) {
                            // [TODO] conflict!
                        } else if (aChanged && !bChanged) {
                            // update
                            log.append(logTemplate(Integer.parseInt(new Integer(actionB.getId()).toString()), "action", "update",
                                    actionA.getRequestUrl(), actionB.getRequestUrl(), "requestUrl"));
                            actionB.setRequestUrl(actionA.getRequestUrl());
                        } else if (!aChanged && bChanged) {
                            // ignore
                        }
                    }
                    if (!actionA.getResponseTemplate().equals(actionB.getResponseTemplate())) {
                        boolean aChanged = (!actionA.getResponseTemplate().equals(actionO.getResponseTemplate()));
                        boolean bChanged = (!actionB.getResponseTemplate().equals(actionO.getResponseTemplate()));

                        if (aChanged && bChanged) {
                            // [TODO] conflict!
                        } else if (aChanged && !bChanged) {
                            // update
                            log.append(logTemplate(Integer.parseInt(new Integer(actionB.getId()).toString()), "action", "update",
                                    actionA.getResponseTemplate(), actionB.getResponseTemplate(), "responseTemplate"));
                            actionB.setResponseTemplate(actionA.getResponseTemplate());
                        } else if (!aChanged && bChanged) {
                            // ignore
                        }
                    }
                    // search requestParameterList
                    Iterator<Parameter> requestParameterIterator = actionA.getRequestParameterList().iterator();
                    while (requestParameterIterator.hasNext()) {
                        Parameter parameterA = requestParameterIterator.next();
                        // scan request parameter
                        Parameter parameterB = findParameter(projectClient, parameterA.getId(), true);
                        if (parameterB == null) {
                            actionB.getRequestParameterList().add(parameterA);
                            continue;
                        }
                        Parameter parameterO = findParameter(projectOriginal, parameterA.getId(), true);
                        processParameter(parameterA, parameterB, parameterO, log);
                    }

                    // search responseParameterList
                    Iterator<Parameter> responseParameterIterator = actionA.getResponseParameterList().iterator();
                    while (responseParameterIterator.hasNext()) {
                        Parameter parameterA = responseParameterIterator.next();
                        // scan response parameter
                        Parameter parameterB = findParameter(projectClient, parameterA.getId(), false);
                        if (parameterB == null) {
                            actionB.getResponseParameterList().add(parameterA);
                            continue;
                        }
                        Parameter parameterO = findParameter(projectOriginal, parameterA.getId(), false);
                        processParameter(parameterA, parameterB, parameterO, log);
                    }
                }
            }

        }
        return "{\"projectData\":" + projectClient.toString() + ", \"log\":\""
                + log + "\", \"projectDataOriginal\":" + projectClient.toString() + "}";
    }


    private void processParameter(Parameter parameterA, Parameter parameterB,
                                  Parameter parameterO, StringBuilder log) {
        if (!parameterA.getName().equals(parameterB.getName())) {
            boolean aChanged = (!parameterA.getName().equals(parameterO.getName()));
            boolean bChanged = (!parameterB.getName().equals(parameterO.getName()));

            if (aChanged && bChanged) {
                // [TODO] conflict!
            } else if (aChanged && !bChanged) {
                // update
                log.append(logTemplate(parameterB.getId(), "parameter", "update",
                        parameterA.getName(), parameterB.getName(), "name"));
                parameterB.setName(parameterA.getName());
            } else if (!aChanged && bChanged) {
                // ignore
            }
        }
        if (!parameterA.getDataType().equals(parameterB.getDataType())) {
            boolean aChanged = (!parameterA.getDataType().equals(parameterO.getDataType()));
            boolean bChanged = (!parameterB.getDataType().equals(parameterO.getDataType()));

            if (aChanged && bChanged) {
                // [TODO] conflict!
            } else if (aChanged && !bChanged) {
                // update
                log.append(logTemplate(parameterB.getId(), "parameter", "update",
                        parameterA.getDataType(), parameterB.getDataType(), "dataType"));
                parameterB.setDataType(parameterA.getDataType());
            } else if (!aChanged && bChanged) {
                // ignore
            }
        }
        if (!parameterA.getIdentifier().equals(parameterB.getIdentifier())) {
            boolean aChanged = (!parameterA.getIdentifier().equals(parameterO.getIdentifier()));
            boolean bChanged = (!parameterB.getIdentifier().equals(parameterO.getIdentifier()));

            if (aChanged && bChanged) {
                // [TODO] conflict!
            } else if (aChanged && !bChanged) {
                // update
                log.append(logTemplate(parameterB.getId(), "parameter", "update",
                        parameterA.getIdentifier(), parameterB.getIdentifier(), "identifier"));
                parameterB.setIdentifier(parameterA.getIdentifier());
            } else if (!aChanged && bChanged) {
                // ignore
            }
        }
        if (!parameterA.getRemark().equals(parameterB.getRemark())) {
            boolean aChanged = (!parameterA.getRemark().equals(parameterO.getRemark()));
            boolean bChanged = (!parameterB.getRemark().equals(parameterO.getRemark()));

            if (aChanged && bChanged) {
                // [TODO] conflict!
            } else if (aChanged && !bChanged) {
                // update
                log.append(logTemplate(parameterB.getId(), "parameter", "update",
                        parameterA.getRemark(), parameterB.getRemark(), "remark"));
                parameterB.setRemark(parameterA.getRemark());
            } else if (!aChanged && bChanged) {
                // ignore
            }
        }
        if (!parameterA.getValidator().equals(parameterB.getValidator())) {
            boolean aChanged = (!parameterA.getValidator().equals(parameterO.getValidator()));
            boolean bChanged = (!parameterB.getValidator().equals(parameterO.getValidator()));

            if (aChanged && bChanged) {
                // [TODO] conflict!
            } else if (aChanged && !bChanged) {
                // update
                log.append(logTemplate(parameterB.getId(), "parameter", "update",
                        parameterA.getValidator(), parameterB.getValidator(), "validator"));
                parameterB.setValidator(parameterA.getValidator());
            } else if (!aChanged && bChanged) {
                // ignore
            }
        }
    }

    private Module findModule(Project p, int moduleId) {
        for (Module i : p.getModuleList()) {
            if (i.getId() == moduleId)
                return i;
        }
        return null;
    }

    private Page findPage(Project p, int pageId) {
        for (Module module : p.getModuleList()) {
            for (Page page : module.getPageList()) {
                if (page.getId() == pageId)
                    return page;
            }
        }
        return null;
    }

    private Action findAction(Project p, int actionId) {
        for (Module module : p.getModuleList()) {
            for (Page page : module.getPageList()) {
                for (Action action : page.getActionList()) {
                    if (action.getId() == actionId)
                        return action;
                }
            }
        }
        return null;
    }

    private Parameter findParameter(Project p, int parameterId, boolean isRequestType) {
        for (Module module : p.getModuleList()) {
            for (Page page : module.getPageList()) {
                for (Action action : page.getActionList()) {
                    for (Parameter parameter : (isRequestType ?
                            action.getRequestParameterList() : action.getResponseParameterList())) {
                        if (parameter.getId() == parameterId)
                            return parameter;
                    }
                }
            }
        }
        return null;
    }


    private String logTemplate(int objectId, String className,
                               String operationName, String newValue, String oldValue, String property) {
        return operationName == "add" ?
                "<div class='log-item'><font color='red'>" + operationName + "</font> <B>" + className + "</B> [" + objectId
                        + "] </div>"
                : "<div class='log-item'><font color='red'>" + operationName + "</font> <B>" + className + "</B> [" + objectId
                + "]." + property + " from [<font color='gray'>" + oldValue + "</font>] to [<font color='blue'>" + newValue + "</font>]</div>";
    }


    public void addCheckIn(CheckIn checkIn) {
        workspaceDao.addCheckIn(checkIn);
    }


    public CheckIn getVersion(int versionId) {
        return workspaceDao.getVersion(versionId);
    }


    public void prepareForVersionSwitch(CheckIn check) {
        workspaceDao.prepareForVersionSwitch(check);

    }
}
