import type { Metadata } from 'next';
import { Barlow_Condensed, Manrope } from 'next/font/google';
import { Header, Footer } from '@/components/site';
import './globals.css';
const display=Barlow_Condensed({subsets:['latin'],weight:['500','600','700'],variable:'--font-display'});
const body=Manrope({subsets:['latin'],variable:'--font-body'});
export const metadata:Metadata={title:{default:'Automechnics — Care you can see.',template:'%s | Automechnics'},description:'Explore car servicing, repairs and care with Automechnics. Understand the work and prepare your service enquiry.',robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${display.variable} ${body.variable}`}><a className="skip" href="#main">Skip to content</a><Header/>{children}<Footer/></body></html>}
