import React, { useState } from 'react';


function HomeScreen() {

    const [nameImg , setNameImg] = useState('page1.png');
    const [numImg , setNumImg] = useState(1);

    const handleImg = () => {
        setNameImg('page'+(numImg+1)+'.png');
        setNumImg( (numImg+1)%7);
    }

    return (
        <div>
            
            {nameImg === 'page7.png' &&  <button  onClick={handleImg }>
                <img src={"./"+nameImg} alt="catalogo" className="imgLayout7"   />
            </button>
            }
            {nameImg !== 'page7.png' &&  <button  onClick={handleImg }>
                <img src={"./"+nameImg} alt="layout" className="imgLayout "   />
            </button>
            }

                
        </div>
    )
}
export default HomeScreen;