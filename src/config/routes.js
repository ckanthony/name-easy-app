/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute'

const LandingPage = lazy(() => import('../pages/Landing'));

const routes = [
  {
    path: '/',
    exact: true,
    element: (
      <UnauthorizedRoute>
        <LandingPage />
      </UnauthorizedRoute>
    ),
  },
]

export default routes
