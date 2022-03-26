// import EditTodoModal from 'components/EditTodoModal';
import { ReactElement } from 'react';
import EditTodoModal from './components/EditTodoModal';
// import MainScreen from 'containers/MainScreen';
import MainScreen from './containers/MainScreen';
import './styles/global.scss';

const App = (): ReactElement => {
    return (
        <>
            <MainScreen />
            <EditTodoModal />
        </>
    );
};

export default App;
