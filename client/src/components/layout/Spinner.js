import React, {Fragment} from 'react' // extension racf creactes arrow function component.
import spinner from './spinner.gif'


export const Spinner = () =>
    <Fragment>
        <img
            src={spinner}
            alt="loading..."
            style={{ width: '200px', margin: 'auto', display: 'block' }} />
    </Fragment>
    
export default Spinner
