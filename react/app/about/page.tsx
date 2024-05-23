import React from 'react';
import Image from 'next/image'
import akane from '../images/akane1.jpg'

export default function About() {
  return (
    <h1>
        About This Project
        <Image
        src={akane}
        placeholder="blur"
        alt="Hello world"/>
    </h1>
  );
}
