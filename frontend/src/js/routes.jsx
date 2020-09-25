import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';

import Grids from "./common/components/Examples/Grids";

import Notificaciones from './common/components/Examples/Notificaciones';

import ExampleTabs from './common/components/Examples/Tabs/Tabs';

import { connectionPost } from './common/components/Post/PostContainer'

import ReportList from './common/components/Report/ReportContainer'

import ManagementList from './common/components/managementPost/managementContainer'

require('../style/index.css');

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                
                {/* Login */}
                <Route exact path="/login" component={Login} />

                {/* Register */}
                <Route exact path="/registro" component={Registro} />

                {/* Home */}
                <ProtectedRoute exact path="/" component={Demo} />

                {/* Post */}
                <ProtectedRoute exact path="/post" component={connectionPost.ListPost} />
                <ProtectedRoute exact path="/post/create" component={connectionPost.CreatePost} />
                <ProtectedRoute exact path="/post/:id/edit" component={connectionPost.CreatePost} />
                <ProtectedRoute exact path="/post/:id/detail" component={connectionPost.DetailPost} />

                {/* Reports */}
                <ProtectedRoute exact path="/report" component={ReportList} />

                {/* Management Post */}
                <ProtectedRoute exact path="/management" component={ManagementList} />

                {/* Examples */}
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                {/* Page Not Found */}
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
