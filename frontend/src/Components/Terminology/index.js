import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Terminology.css';
import '../../config';

import { getDatasetSelection } from '../../store/dataset';
import { changeD0Description, changeD1Description, changeY0Description, changeY1Description, getD0Description, getD1Description, getY0Description, getY1Description } from '../../store/terminology';

function Terminology({}) {
    const datasetSelection = useSelector(getDatasetSelection)
    const y0description = useSelector(getY0Description)
    const y1description = useSelector(getY1Description)
    const d0description = useSelector(getD0Description)
    const d1description = useSelector(getD1Description)

    const dispatch = useDispatch ()
    function sety0description(currency) {dispatch(changeY0Description(currency))}
    function sety1description(currency) {dispatch(changeY1Description(currency))}
    function setd0description(currency) {dispatch(changeD0Description(currency))}
    function setd1description(currency) {dispatch(changeD1Description(currency))}
    
    useEffect(() => {
        setd0description(global.config.datasets[datasetSelection]['d0']);
        setd1description(global.config.datasets[datasetSelection]['d1']);
        sety0description(global.config.datasets[datasetSelection]['y0']);
        sety1description(global.config.datasets[datasetSelection]['y1']);
    }, [datasetSelection]);
    
    return (
        <div className='ParetoPlot'>
            <h1>Terminology</h1>
            <b>Y</b>: The actual outcome, also known as the "ground truth"; not known at prediction time.
            <br/><br/>
            <b>Label the two possible outcomes:</b>
            <br/>
            <label htmlFor="y1description">Y=1</label>
            <input type="text" id="y1description" value={y1description} onChange={(e) => sety1description(e.target.value)} style={{width: "500px"}}/>
            <br/>
            <label htmlFor="y0description">Y=0</label>
            <input type="text" id="y0description" value={y0description} onChange={(e) => sety0description(e.target.value)} style={{width: "500px"}}/>
            <br/><br/>
            <b>D</b>: The decision in question; is trying to predict Y.
            <br/><br/>
            <b>Label the two possible decisions:</b>
            <br/>
            <label htmlFor="d1description">D=1</label>
            <input type="text" id="d1description" value={d1description} onChange={(e) => setd1description(e.target.value)} style={{width: "500px"}}/>
            <br/>
            <label htmlFor="d0description">D=0</label>
            <input type="text" id="d0description" value={d0description} onChange={(e) => setd0description(e.target.value)} style={{width: "500px"}}/>
            <br/><br/>
            
            <b>Decision maker</b>: The people or organization designing the algorithm, deciding on its design and thereby ultimately taking the decisions in question.
            <br/>
            <b>Decision subjects</b>: The people subjected to the decisions of the algorithm. They may or may not be aware that this algorithm is being deployed and used to make decisions about them.
        </div>
      );
}

export default Terminology;