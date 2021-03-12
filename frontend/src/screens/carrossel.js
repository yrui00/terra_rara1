import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listCategoryCarr } from '../actions/categoryActions';
const { txtToSlug, getStyle } = require('../actions/geralActions');


function Carrossel(props) {

    const dispatch = useDispatch();
    const categoryListCarr = useSelector((state) => state.categoryListCarr);
    const { categoryCarr } = categoryListCarr;
    const [leftBts, setLeftBts] = useState({ left: 0 });


    useEffect(() => {
        dispatch(listCategoryCarr('', 'ASC', '0'));
        return () => {
            //
        };
    }, []);


    const moveBts = (dir) => {
        var el = document.getElementsByClassName("btsCarrossel");
        var el2 = document.getElementsByClassName("ovBts");
        var l = parseInt(getStyle(el[0], 'left'));

        var move = 180 * 3;
        if (dir === 'left') {
            l += move;
            if (l >= 0) {
                l = 0;
            }
        } else {
            l -= move;
            if (l < (parseInt(getStyle(el2[0], 'width')) - parseInt(getStyle(el[0], 'width')))) {
                l = (parseInt(getStyle(el2[0], 'width')) - parseInt(getStyle(el[0], 'width')));
            }
        }
        setLeftBts({ left: l });

    }


    return (
        <div>

            <div className="carrossel">
                <button className="setaEsq" onClick={(e) => moveBts('left')} ></button>
                <div className="ovBts">
                    <div className="btsCarrossel" style={leftBts} >
                        {categoryCarr.length > 0 &&
                            categoryCarr.map((cat) =>
                                <Link key={cat._id} to={'/catalogo/' + txtToSlug(cat.titulo)} >
                                    <div className="btCat">
                                        {cat.arquivo.map((c) =>
                                            <div className="image" key={c.fileName}>
                                                <img src={"/images/" + c.fileName} alt={c.fileName} />
                                            </div>
                                        )}
                                        <div className="titulo">{cat.titulo}</div>
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                </div>
                <button className="setaDir" onClick={(e) => moveBts('rigth')} ></button>
            </div>

        </div>

    )
}
export default Carrossel;