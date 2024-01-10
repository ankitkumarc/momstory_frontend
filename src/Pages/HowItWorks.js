import React from 'react'
import Footer from '../Components/layouts/Footer'

const HowItWorks = () => {
    return (
        <>
            <section id="Howitworks" className="section-2 wf-section" href="/howitworks">
                <div className="w-layout-blockcontainer container-11 w-container">
                    <div className="columns w-row">
                        <div className="column-2 w-col w-col-6"><img src="../images/panda-reading-book-p-1080.png" loading="lazy" sizes="100vw"
                            srcSet="images/storymaking4-p-500.png 500w, images/storymaking4-p-800.png 800w, images/storymaking4.png 1024w" className="image-16" alt="panda reading" /></div>
                        <div className="column-3 w-col w-col-6">
                            <p className="paragraph-8">Using AI-power, we craft personalised and unique stories that pack a punch of fun and
                                adventure while teaching priceless life lessons.</p>
                            <div>
                                <ol>
                                    <li className="list-item"> Select your life lesson</li>
                                    <li className="list-item">Identify favourite characters <br /></li>
                                    <li className="list-item-2">and let us do some <strong>story</strong> <strong>magic</strong>!</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default HowItWorks
