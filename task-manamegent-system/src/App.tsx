import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import CreateTask from './pages/CreateTask';
import TaskList from './pages/TaskList';
import WorkloadReport from './pages/WorkloadReport';
import OverdueReport from './pages/OverdueReport';
import { ToastContainer } from './components/UI/Toast';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/workload" element={<WorkloadReport />} />
        <Route path="/overdue" element={<OverdueReport />} />
      </Routes>
      <ToastContainer />
    </MainLayout>
  );
}

export default App;
