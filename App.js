
import { AppProvider } from './src/context/AppContext';
import StackNavigation from './src/navigation/stackNavigation';
import Login from './src/screens/Login';

export default function App() {
  return (
    <AppProvider>
      <StackNavigation />
    </AppProvider>
  );
}
