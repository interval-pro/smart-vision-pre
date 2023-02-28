import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../@services/firebase-config';
import './landing-page.scss';
import logo from '../../@assets/logo.png';

export const LandingPage = () => {
    const [email, setEmail] = useState("");
    const [nSubs, setNSubs] = useState(0);
    const [message, setMessage] = useState("");
    const subscribersCollection = collection(db, "subscribers");

    const subscribe = async () => {
        try {
            setMessage('')
            const date = Date.now();
            const country = Intl.DateTimeFormat().resolvedOptions().timeZone;
            await validateEmail();
            const subsInfo = { date, country, email };
            const res = await addDoc(subscribersCollection, subsInfo);
            console.log({ res });
            if (res.type === 'document') {
                setEmail("");
                setMessage(`${email} Subscribed!`);
                read();
            }
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    const validateEmail = async () => {
        if (!email) throw new Error("Email not Valid");
        if (email.length < 5) throw new Error("Too short Email");
        if (!email.includes("@")) throw new Error("Email not Valid");

        const data = await getDocs(subscribersCollection)
        const docs = data.docs.map(d => d.data());
        const existingSubs = docs.find(q => q['email'] === email);
        if (existingSubs) throw new Error("The Email is Already Subscribed");
        return true;
    };

    useEffect(() => {
        read();
    }, []);

    const read = async () => {
        const data = await getDocs(subscribersCollection);
        if (data?.docs.length) setNSubs(data.docs.length)
    };

    const onKeyDown = (key: string) => key === 'Enter' ? subscribe() : null;

    return (
        <div className="langing-page">
            <div className="wrapper">
                <div className="main-image">
                    <img src={logo} className="logo" />
                    <div className="title">
                        <span>
                            SMART-VISION
                        </span>
                    </div>
                </div>
                <div className="sub-wrapper" >
                    <div className="paragraph-wrapper">
                        <div className="line-paragraph">
                            Smart Vision (by Interval Pro) is a web-based AI-powered camera monitoring
                                service for businesses and individuals. This platform uses AI scripts for
                                analysis webcam outputs and generate any statistics depending on the customer's needs.
                                This technology offers a more efficient and cost-effective way to monitor and analyze data.
                                Our service provides real-time insights into traffic flow, visitor traffic,
                                and other key metrics that can help businesses and individuals optimize their
                                operations and marketing strategies.
                        </div>
                    </div>
                    <div className="paragraph-wrapper">
                        <div className="line-paragraph">
                            <span className='text'>
                                    One of the key benefits of using this software is its ability 
                                to provide real-time insights into traffic flow. By analyzing 
                                data from your cameras, this platform can help you understand 
                                how people move through your space, which areas are most heavily trafficked, 
                                and how long visitors spend in different areas.
                                This information can be invaluable when it comes to optimizing your floor plan,
                                identifying bottlenecks, and improving the overall visitor experience.
                            </span>
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
                        </div>
                    </div>
                    <div className="paragraph-wrapper">
                        <div className="line-paragraph">
                            <span className='text'>
                                    In addition to monitoring traffic flow,
                                Smart Vision can also provide insights into visitor traffic.
                                By analyzing data from your cameras, this platform can help you
                                understand how many people are visiting your space, when they are visiting,
                                and how long they are staying. This information can be useful
                                when it comes to optimizing your marketing strategies,
                                identifying trends, and improving your overall customer experience.
                            </span>
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
                        </div>
                    </div>
                    <div className="paragraph-wrapper">
                        <div className="line-paragraph">
                            One of the key benefits the service is its ease of use.
                                The platform is designed to be intuitive and user-friendly,
                                making it accessible to users of all levels of technical expertise.
                                Whether you are a small business owner looking to optimize your operations
                                or a large corporation with complex data analysis needs, this platform can
                                be customized to meet your unique requirements. This means that no matter how
                                big or small your organization is, you can benefit from the insights and analytics.
                            <div className="subs-box">
                                <input
                                    type="text"
                                    placeholder='Your Email'
                                    value={email}
                                    onKeyDown={(k) => onKeyDown(k.key)}
                                    onChange={(k) => setEmail(k.target.value)}
                                />
                                <button onClick={() => subscribe() }>SUBSCRIBE</button>

                                <div className="subs-info">
                                    <div className={`message ${message.includes('Subscribed') ? 'green' : 'red'}`}>
                                        { message }
                                    </div>
                                    By subscribing, you'll receive regular updates on our progress,
                                    as well as exclusive access to early bird pricing and other special offers.
                                    You'll also be the first to know about new features and product updates.
                                    < br/> { nSubs } Subscribers
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
