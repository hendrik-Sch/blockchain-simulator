import React from 'react';

import { Routes as RoutesContainer, Route } from "react-router-dom";

import RouteComponents from './components/';
import Home from './components/home/';

import RolesDefinition from '../../data/RolesDefinition.json';

const Routes = () => {
    return (
        <RoutesContainer>
            <Route path="/" element={<Home />} />
            {RolesDefinition.map((role, index) => {
                const Comp = RouteComponents[role.component];

                return (
                    <Route key={index} path={role.link} element={<Comp />} />
                );
            })}
        </RoutesContainer>
    );
};

export default Routes;