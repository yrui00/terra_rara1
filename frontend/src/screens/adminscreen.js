import React from 'react';

  
function AdminScreen() {
    
    return (
        <div>

            <div className="contLogin">
                <form>
                    <div className="lineForm">
                        <input type="text" name="login" />
                    </div>
                    <div className="lineForm">
                        <input type="password" name="pass" />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AdminScreen;