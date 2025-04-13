const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  console.log('Response status:', response.status);
  console.log('Response headers:', Object.fromEntries(response.headers.entries()));
  
  if (!response.ok) {
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    } else {
      const text = await response.text();
      console.error('Non-JSON error response:', text);
      throw new Error('Server returned non-JSON response');
    }
  }
  
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  
  const text = await response.text();
  console.warn('Non-JSON success response:', text);
  return text;
};

export const api = {
  // Auth APIs
  login: async (credentials) => {
    console.log('Attempting login with:', credentials);
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Class Management APIs
  getClasses: async (facultyId) => {
    console.log('Fetching classes for faculty:', facultyId);
    console.log('Using headers:', getAuthHeaders());
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/classes`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  createClass: async (facultyId, classData) => {
    console.log('Creating class for faculty:', facultyId);
    console.log('Class data:', classData);
    console.log('Using headers:', getAuthHeaders());
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/classes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name: classData.name,
        code: classData.code,
        schedule: classData.schedule,
        room: classData.room,
        facultyId: facultyId
      }),
    });
    return handleResponse(response);
  },

  updateClass: async (facultyId, classId, classData) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/classes/${classId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(classData),
    });
    return handleResponse(response);
  },

  deleteClass: async (facultyId, classId) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/classes/${classId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Attendance APIs
  generateQR: async (facultyId, classId, duration) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/classes/${classId}/qr`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ duration }),
    });
    return handleResponse(response);
  },

  getAttendanceRecords: async (facultyId, filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/attendance?${queryParams}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  markAttendance: async (facultyId, data) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/attendance/mark`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Analytics APIs
  getAnalytics: async (facultyId) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/analytics`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getDefaulters: async (facultyId) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/defaulters`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Announcement APIs
  getAnnouncements: async (facultyId) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/announcements`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  createAnnouncement: async (facultyId, announcementData) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/announcements`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(announcementData),
    });
    return handleResponse(response);
  },

  // Leave Management APIs
  getLeaveRequests: async (facultyId) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/leave-requests`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  createLeaveRequest: async (facultyId, requestData) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/leave-requests`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(requestData),
    });
    return handleResponse(response);
  },

  updateLeaveRequest: async (facultyId, requestId, status) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/leave-requests/${requestId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    return handleResponse(response);
  },

  deleteLeaveRequest: async (facultyId, requestId) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/leave-requests/${requestId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // Student Management APIs
  getStudents: async (facultyId, classId) => {
    const queryParams = classId ? `?classId=${classId}` : '';
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/students${queryParams}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  notifyDefaulters: async (facultyId, studentIds) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${facultyId}/notify-defaulters`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ studentIds }),
    });
    return handleResponse(response);
  },
}; 