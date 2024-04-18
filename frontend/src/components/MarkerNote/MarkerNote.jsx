import React, { useState } from 'react';

const Comment = ({ username, comment, userRating, dateCreated, getColorByRating }) => {
    const [votes, setVotes] = useState(0);
    const ratingColor = getColorByRating(userRating);

    const handleUpvote = () => {
        if (votes < 1) {
            setVotes(votes + 1);
        }
    };

    const handleDownvote = () => {
        if (votes > -1) {
            setVotes(votes - 1);
        }
    };

    function formatDate( timestamp ) {
        const date = new Date(timestamp);
        
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        
        const formattedDate = `${month}-${day}-${year}`;
        return formattedDate;
    }

    return (
        <div style={{ maxWidth: '500px', padding: '10px', paddingBottom: '0px', marginBottom: '0px'}}>
            <div style={{ display: 'flex', justifyContent: 'flex-start',  }}>
                <div style={{ display: 'flex', marginRight: '10px' }}>
                    <img src='../../../public/sampleProfilePic.svg' alt="Profile" style={
                        { width: '50px', height: '50px', borderRadius: '50%', position:'relative', top: '5px', right: '5px' }} />
                </div>          
                <div style={{ fontStyle: 'italic', paddingRight: '8px', color: '#6D6D6D', fontSize: '15px' }}>
                    {username} •
                </div>
                <div style={{ fontStyle: 'italic', paddingRight: '10px', color: '#6D6D6D', fontSize: '15px' }}>
                    {formatDate(dateCreated)}
                </div>
                <div style={
                    {width: '25px', height: '25px', borderRadius: '50%', 
                    backgroundColor: ratingColor, color: 'white', display: 'flex', justifyContent: 
                    'center', alignItems: 'center', fontSize: '16px' }}>
                    {`${userRating}`}
                </div>
            </div>
            <div style={{ 
                position: 'relative', bottom: '1.1rem', left: '3rem', fontSize: '18px',
                maxWidth: '15rem', wordWrap: 'break-word',}}>
                    {comment}
            </div>
            <div style={{ 
                position: 'relative', bottom: '0.8rem', fontSize: '15px',
                display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '60px', 
                }}>
                <button onClick={handleUpvote} style={{ marginRight: '5px' }}><img src='../../../public/up.png'/></button>
                <span>{votes} </span>
                <button onClick={handleDownvote} style={{ marginLeft: '5px' }}><img src='../../../public/down.png'/></button>
            </div>
        </div>
    );
};

export default Comment;