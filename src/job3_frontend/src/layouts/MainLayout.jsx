import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';


export const MainLayout = () => {
    return (
        <main >
            <Outlet />
        </main>
    )
}
