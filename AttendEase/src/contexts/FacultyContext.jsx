import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/services/api';
import { useAuth } from './AuthContext';

const FacultyContext = createContext();

export const useFaculty = () => {
  const context = useContext(FacultyContext);
  if (!context) {
    throw new Error('useFaculty must be used within a FacultyProvider');
  }
  return context;
};

export const FacultyProvider = ({ children }) => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [defaulters, setDefaulters] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [attendanceFilters, setAttendanceFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    class: '',
    student: ''
  });

  // Fetch classes
  const fetchClasses = async () => {
    try {
      setLoading(true);
      console.log('Fetching classes for user:', user.id);
      const data = await api.getClasses(user.id);
      console.log('Classes fetched:', data);
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Create a new class
  const createClass = async (classData) => {
    try {
      setLoading(true);
      console.log('Creating class with data:', classData);
      const data = await api.createClass(user.id, classData);
      console.log('Class created:', data);
      setClasses(prevClasses => [...prevClasses, data]);
      return data;
    } catch (error) {
      console.error('Error creating class:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete class
  const deleteClass = async (classId) => {
    try {
      setLoading(true);
      console.log('Deleting class:', classId);
      await api.deleteClass(user.id, classId);
      setClasses(prevClasses => prevClasses.filter(c => c.id !== classId));
      console.log('Class deleted successfully');
    } catch (error) {
      console.error('Error deleting class:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Generate QR code
  const generateQRCode = async (classId) => {
    try {
      console.log('Generating QR code for class:', classId);
      const data = await api.generateQR(user.id, classId);
      console.log('QR code generated successfully');
      return data.qrCode;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw error;
    }
  };

  // Fetch attendance records
  const fetchAttendanceRecords = async (filters = attendanceFilters) => {
    try {
      setAttendanceLoading(true);
      const data = await api.getAttendanceRecords(user.id, filters);
      setAttendanceRecords(data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      throw error;
    } finally {
      setAttendanceLoading(false);
    }
  };

  // Fetch analytics
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await api.getAnalytics(user.id);
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fetch defaulters
  const fetchDefaulters = async () => {
    try {
      setLoading(true);
      const data = await api.getDefaulters(user.id);
      setDefaulters(data);
    } catch (error) {
      console.error('Error fetching defaulters:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await api.getAnnouncements(user.id);
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Create announcement
  const createAnnouncement = async (announcementData) => {
    try {
      setLoading(true);
      const data = await api.createAnnouncement(user.id, announcementData);
      setAnnouncements(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error creating announcement:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fetch leave requests
  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      const data = await api.getLeaveRequests(user.id);
      setLeaveRequests(data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Create leave request
  const createLeaveRequest = async (requestData) => {
    try {
      setLoading(true);
      const data = await api.createLeaveRequest(user.id, requestData);
      setLeaveRequests(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error creating leave request:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update leave request
  const updateLeaveRequest = async (requestId, status) => {
    try {
      setLoading(true);
      const data = await api.updateLeaveRequest(user.id, requestId, status);
      setLeaveRequests(prev => prev.map(req => req.id === requestId ? data : req));
      return data;
    } catch (error) {
      console.error('Error updating leave request:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete leave request
  const deleteLeaveRequest = async (requestId) => {
    try {
      setLoading(true);
      await api.deleteLeaveRequest(user.id, requestId);
      setLeaveRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error deleting leave request:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchClasses();
      fetchAttendanceRecords();
      fetchAnalytics();
      fetchDefaulters();
      fetchAnnouncements();
      fetchLeaveRequests();
    }
  }, [user]);

  const value = {
    classes,
    loading,
    createClass,
    deleteClass,
    generateQRCode,
    attendanceRecords,
    attendanceLoading,
    attendanceFilters,
    setAttendanceFilters,
    fetchAttendanceRecords,
    analytics,
    defaulters,
    announcements,
    createAnnouncement,
    leaveRequests,
    createLeaveRequest,
    updateLeaveRequest,
    deleteLeaveRequest
  };

  return (
    <FacultyContext.Provider value={value}>
      {children}
    </FacultyContext.Provider>
  );
}; 