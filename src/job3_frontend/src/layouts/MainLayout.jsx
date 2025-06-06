import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';


export const MainLayout = () => {
    return (
        <main >
            <Header />
            <Outlet />
        </main>
    )
}
