import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PublicShowcase from './pages/public-showcase';
import OrganizerDashboard from './pages/organizer-dashboard';
import ParticipantPortal from './pages/participant-portal';
import JudgeDashboard from './pages/judge-dashboard';
import Homepage from './pages/homepage';
import CommunityHub from './pages/community-hub';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CommunityHub />} />
        <Route path="/public-showcase" element={<PublicShowcase />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/participant-portal" element={<ParticipantPortal />} />
        <Route path="/judge-dashboard" element={<JudgeDashboard />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/community-hub" element={<CommunityHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
