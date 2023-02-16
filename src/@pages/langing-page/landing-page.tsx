import { useState } from 'react';
import './landing-page.scss';

export const LandingPage = () => {
    const [email, setEmail] = useState<String>();

    const subscribe = () => {
        console.log(`Subscribe, ${email}`);
    };

    const onKeyDown = (key: string) => {
        if (key === 'Enter') subscribe();
    };

    return (
        <div className="langing-page">
            <div className="wrapper">
                <div className="main-image"></div>
                <div className="title">
                    <div className="main">
                        Monitoring
                    </div>
                    <div className="sub">
                        Powred by Interval Pro
                    </div>
                </div>
                <div className="sub-wrapper">
                    <div className="main-text">
                        <p>
                            Monitoring (by Interval Pro) is a web-based AI-powered camera monitoring
                            service for businesses and individuals. This platform uses AI scripts for
                            analysis webcam outputs and generate any statistics depending on the customer's needs.
                            This technology offers a more efficient and cost-effective way to monitor and analyze data.
                        </p>
                        <p>Our service provides real-time insights into traffic flow, visitor traffic,
                            and other key metrics that can help businesses and individuals optimize their
                            operations and marketing strategies.
                        </p>
                        <p>
                            Here are some examples of what it can be used for:
                        </p>
                        <ul>
                                <li>Small to medium-sized businesses and organizations</li>
                                <li>Retail stores</li>
                                <li>Public events</li>
                                <li>Shopping centers</li>
                                <li>Parking garages</li>
                                <li>Individuals looking to monitor their properties</li>
                                <li>Assess visitor traffic</li>
                                <li>Identify potential security threats</li>
                            </ul>
                        <p>
                            One of the key benefits the service is its ease of use.
                            The platform is designed to be intuitive and user-friendly,
                            making it accessible to users of all levels of technical expertise.
                            Whether you are a small business owner looking to optimize your operations
                            or a large corporation with complex data analysis needs, this platform can
                            be customized to meet your unique requirements. This means that no matter how
                            big or small your organization is, you can benefit from the insights and analytics.
                        </p>
                    </div>
                    <div className="subs">
                        <div className="subs-form">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => onKeyDown(e.key)}
                                type="text"
                                placeholder='Your E-mail'
                            />
                            <button onClick={() => subscribe()}>Subscribe</button>
                        </div>
                        <p>
                            By subscribing, you'll receive regular updates on our progress,
                            as well as exclusive access to early bird pricing and other special offers.
                            You'll also be the first to know about new features and product updates.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
