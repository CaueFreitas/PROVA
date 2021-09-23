
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Alunos from './pages/alunos';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Alunos} />
                <Route path="*" component={Error} />
            </Switch>
        </BrowserRouter>
    )
}