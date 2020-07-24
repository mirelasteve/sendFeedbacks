import React from 'react'

export const Landing = () => {
    return (
        <div className='container mt-5 '>
        <div className='row'>
        <div className='s-4 xs-12 mt-5 text-light-app'>
            <h4>Thank you very much for being here! </h4>
            <h6 className='mt-5'>
                Ask your clients with simple yes/no question if they use
                your product, if they like your services.
            </h6>
            <h6 className='mt-10'>Example</h6>
        </div>
        <div className='col'>
                <div className='card text-dark-app'>
                            <div className='card-content'>
                                <div>
                                    <span className='card-title'>
                                    {new Date().toLocaleDateString()}
                                    <button className='btn-small right red'>X</button>
                                    
                                    </span>
                                    
                                </div>
                            
                                <div>
                                    <span className='bold col s12 m5' >Campaign name</span>
                                    <span className='subject col s12 m7'>Spa center survey</span>
                                </div>
                                <div>
                                    <span className='bold col s12 m5' >Subject</span>
                                    <span className='subject col s12 m7'>Plan visit us ?</span>
                                </div>
                                <div>
                                    <span className='bold col s12 m5'>Content</span> 
                                    <span className='subject col s12 m7'>You are a client of our spa center. Have you enjoyed your stay ?</span>
                                </div>
                                <div>
                                    <span className='bold col s12 m5 red-text'>Yes 45</span>
                                </div>
                                <div className='row'>
                                    <span className='bold col s12 m4 red-text'>No 8</span>
                                </div>
                                
                                <div className='card-action'>
                                </div>

                            </div>
                    </div>
        </div>
        </div>
        </div>
    )
}
