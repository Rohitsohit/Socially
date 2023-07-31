import React from 'react'
import Navbar from './Navbar'
import {View,Responsive} from '@aws-amplify/ui-react';

export default function NavbarLayout({children}) {
  return (
    <View style={{ display: 'flex',margin:"3em", gap: '10px'  }}>
      {/* Navbar component */}
      <View
        width={['100%', '100%', '16em']}
        boxShadow="2px 2px 2px 2px var(--amplify-colors-neutral-40)"
        marginTop={['3em', '0']}
        height={['15em', '20em']}
      >
        <Navbar />
      </View>

      {/* Children with a small gap */}
      <View style={{ flex: 1, gap: '10px' }}>
        {children}
      </View>
    </View>
  )
}
