import { useState } from 'react';
import '../index.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

export const APOD = ({ date,title, urlImage }: {date:string, title: string, urlImage: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="apod-card"
        >
            <motion.div
                layout
                className="apod-info"
                id='apod-info'
                animate={{ textAlign: isOpen ? 'center' : 'start' }}
                transition={{ duration: 0.5 }}
            >
                <motion.h2 layout="position">{title}</motion.h2>
            </motion.div>
            
            <motion.button
                layout
                onClick={() => setIsOpen(!isOpen)}
                className='expand'
            >
                {isOpen ? '-' : '+'}
            </motion.button>
            {isOpen && (
                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className="apod-image"
                    >
                    <Link to={`/apod-details/${date}`} className='apod-link'>
                        <img src={urlImage} alt={title} />
                    </Link>
                    </motion.div>
            )}
        </motion.div>
    );
};