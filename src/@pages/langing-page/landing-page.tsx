import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useState, useEffect, useRef, MouseEventHandler } from 'react';
import { db } from '../../@services/firebase-config';
import './landing-page.scss';
import logo from '../../@assets/logo.png';
import screenshot from '../../@assets/screenshot.png';
import illustration1 from '../../@assets/image1.png';

export const LandingPage = () => {
    const [email, setEmail] = useState("");
    const [nSubs, setNSubs] = useState(0);
    const [message, setMessage] = useState("");
    const subscribersCollection = collection(db, "subscribers");
    const previewRef = useRef<HTMLDivElement>(null);

    const onImageClick = (event: any) => {
        if (!previewRef.current) return;
        previewRef.current.style.display = 'flex';
        (previewRef.current.firstChild as HTMLImageElement).src = event.target.src;
    }

    const onPreviewClick = () => {
        if (!previewRef.current) return;
        previewRef.current.style.display = 'none';
    }
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
        <div className="landing-page mx-auto max-w-6xl">
            <div className="header-image min-w-full">
                <img src={logo} />
            </div>
            <div className="sections-wrapper">
                <div className='section flex-col'>
                    <div className='text'>
                        Smart Vision (by Interval Pro) is a web-based AI-powered camera monitoring
                        service for businesses and individuals. This platform uses AI scripts for
                        analysis webcam outputs and generate any statistics depending on the customer's needs.
                        This technology offers a more efficient and cost-effective way to monitor and analyze data.
                        Our service provides real-time insights into traffic flow, visitor traffic,
                        and other key metrics that can help businesses and individuals optimize their
                        operations and marketing strategies.
                    </div>
                    <div className="illustrations-wrapper">
                        <div className="illustation">
                            <div className="illustration-text">Detect</div>
                            <img src={illustration1} />
                        </div>
                        <div className="illustation">
                            <div className="illustration-text">Collect</div>
                            <img src={illustration1} />
                        </div>
                        <div className="illustation">
                            <div className="illustration-text">Visualize</div>
                            <img src={illustration1} />
                        </div>
                        <div className="illustation">
                            <div className="illustration-text">Analyze</div>
                            <img src={illustration1} />
                        </div>
                    </div>
                </div>
                <div className='section'>
                    <div className="sub-section">
                        <div className='text'>
                            One of the key benefits of using this software is its ability
                            to provide real-time insights into traffic flow. By analyzing
                            data from your cameras, this platform can help you understand
                            how people move through your space, which areas are most heavily trafficked,
                            and how long visitors spend in different areas.
                            This information can be invaluable when it comes to optimizing your floor plan,
                            identifying bottlenecks, and improving the overall visitor experience.
                            One of the key benefits of using this software is its ability
                            to provide real-time insights into traffic flow. By analyzing
                            data from your cameras, this platform can help you understand
                            how people move through your space, which areas are most heavily trafficked,
                            and how long visitors spend in different areas.
                        </div>
                    </div>
                    <div className="sub-section">
                        <div className="screenshot">
                            <img src={screenshot} onClick={(e) => onImageClick(e)} />
                        </div>
                    </div>
                </div>
                <div className='section flex-row-reverse'>
                    <div className="sub-section">
                        <ul className='list-disc'>
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
                    <div className="sub-section">
                        <div className="screenshot">
                            <img src={screenshot} onClick={(e) => onImageClick(e)} />
                        </div>
                    </div>
                </div>
                <div className='section flex-col'>
                    <div className='text'>
                        Smart Vision (by Interval Pro) is a web-based AI-powered camera monitoring
                        service for businesses and individuals. This platform uses AI scripts for
                        analysis webcam outputs and generate any statistics depending on the customer's needs.
                        This technology offers a more efficient and cost-effective way to monitor and analyze data.
                        Our service provides real-time insights into traffic flow, visitor traffic,
                        and other key metrics that can help businesses and individuals optimize their
                        operations and marketing strategies.
                    </div>
                    <div className="screenshots-wrapper">
                        <div className="screenshot">
                            <img src={screenshot} onClick={(e) => onImageClick(e)} />
                        </div>
                        <div className="screenshot">
                            <img src={screenshot} onClick={(e) => onImageClick(e)} />
                        </div>
                    </div>
                </div>
                <div className='section'>
                    <div className='text'>
                        In addition to monitoring traffic flow,
                        Smart Vision can also provide insights into visitor traffic.
                        By analyzing data from your cameras, this platform can help you
                        understand how many people are visiting your space, when they are visiting,
                        and how long they are staying. This information can be useful
                        when it comes to optimizing your marketing strategies,
                        identifying trends, and improving your overall customer experience.
                    </div>
                </div>
            </div>


            <div className='subscribe'>
                <input
                    type="text"
                    placeholder='Your Email'
                    value={email}
                    onKeyDown={(k) => onKeyDown(k.key)}
                    onChange={(k) => setEmail(k.target.value)}
                />
                <button onClick={() => subscribe()}>SUBSCRIBE</button>

                <div className="subs-info">
                    <div className={`message ${message.includes('Subscribed') ? 'green' : 'red'}`}>
                        {message}
                    </div>
                    By subscribing, you'll receive regular updates on our progress,
                    as well as exclusive access to early bird pricing and other special offers.
                    You'll also be the first to know about new features and product updates.
                    < br /> {nSubs} Subscribers
                </div>
            </div>
            <div id="screenshot-preview" ref={previewRef} onClick={() => onPreviewClick()}>
                <img src=''></img>
            </div>
        </div>
    );
};
