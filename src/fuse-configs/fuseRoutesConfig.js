import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {MainConfig} from 'main/content/MainConfig';
import {FormBuilderConfig} from "../main/content/FormBuilder/FormBuilderConfig";

const routeConfigs = [
    MainConfig,
    FormBuilderConfig
];

export const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/example"/>
    }
];
