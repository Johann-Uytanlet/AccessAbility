import React, { useState } from 'react';

const Comment = ({ username, comment }) => {
    const [votes, setVotes] = useState(0);

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

    

    return (
        <div style={{ maxWidth: '500px', border: '1px solid #ccc', padding: '10px', marginBottom: '10px'}}>
        <div style={{ display: 'flex', justifyContent: 'flex-start',  }}>
            <div style={{ display: 'flex', marginRight: '10px' }}>
                <img src='../../../public/sampleProfilePic.png' alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', }} />
            </div>          
            <div style={{ marginRight: '10px', fontWeight: 'bold', paddingRight: '10px'  }}>{username}</div>
            <div style={{marginRight: '20px', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#36AE26', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                5
            </div>
            <div>4/20/24</div>
            
        </div>
        <div style={{ maxWidth: '400px', wordWrap: 'break-word', marginLeft: '60px', marginBottom: '20px'}}>{comment}</div>
            
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '60px' }}>
            <button onClick={handleUpvote} style={{ marginRight: '5px' }}><img src='../../../public/up.png'/></button>
            <span>{votes} votes</span>
            <button onClick={handleDownvote} style={{ marginLeft: '5px' }}><img src='../../../public/down.png'/></button>
        </div>
        </div>
    );
};

export default Comment;