import { Text, View, Link } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import GenerateImage from './GenerateImage';

export default function Navbar() {
  const [hoveredText, setHoveredText] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredText((prev) => [...prev, index]);
  };

  const handleMouseLeave = (index) => {
    setHoveredText((prev) => prev.filter((item) => item !== index));
  };

  const isSmallScreen = window.innerWidth <= 768;

  return (
    <View margin="4em">
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Text
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave(0)}
          style={{
            color: hoveredText.includes(0) ? '#6045ba' : 'black',
            cursor: 'pointer',
            marginBottom: isSmallScreen ? '5px' : '10px', // Adjust margin for small screens
          }}
        >
          Home
        </Text>
      </Link>

      <Link href="/friendrequest" style={{ textDecoration: 'none' }}>
        <Text
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}
          style={{
            color: hoveredText.includes(1) ? '#6045ba' : 'black',
            cursor: 'pointer',
            marginBottom: isSmallScreen ? '5px' : '10px', // Adjust margin for small screens
          }}
        >
          Friend Request
        </Text>
      </Link>

      <Link href="/postform" style={{ textDecoration: 'none' }}>
        <Text
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}
          style={{
            color: hoveredText.includes(2) ? '#6045ba' : 'black',
            cursor: 'pointer',
            marginBottom: isSmallScreen ? '5px' : '10px', // Adjust margin for small screens
          }}
        >
          Create Post
        </Text>
      </Link>

      <Link href="/generate" style={{ textDecoration: 'none' }}>
        <Text
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={() => handleMouseLeave(3)}
          style={{
            color: hoveredText.includes(3) ? '#6045ba' : 'black',
            cursor: 'pointer',
            marginBottom: isSmallScreen ? '5px' : '10px', // Adjust margin for small screens
          }}
        >
          Generate
        </Text>
      </Link>
    </View>
  );
}
