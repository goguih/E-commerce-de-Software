import React from 'react'
import Footer from '../Footer/components/footer'
import { Copyright } from '../../../globalFunction'

export default function FooterMenu() {
    return (
        <Footer>
            <Footer.Wrapper>
            <Footer.Row>
                <Footer.Column >
                <Footer.Title>Sobre nós</Footer.Title>
                    <Footer.Link href="#">História</Footer.Link>
                    <Footer.Link href="#">Clientes</Footer.Link>
                    <Footer.Link href="#">Testemunhas</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Serviços</Footer.Title>
                    <Footer.Link href="#">Marketing</Footer.Link>
                    <Footer.Link href="#">Consultor</Footer.Link>
                    <Footer.Link href="#">Desenvolvimento</Footer.Link>
                    <Footer.Link href="#">Design</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Contate-nos</Footer.Title>
                    <Footer.Link href="#">United States</Footer.Link>
                    <Footer.Link href="#">Brasil</Footer.Link>
                    <Footer.Link href="#">Australia</Footer.Link>
                    <Footer.Link href="#">Suporte</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Social</Footer.Title>
                    <Footer.Link href="#">Facebook</Footer.Link>
                    <Footer.Link href="#">Instagram</Footer.Link>
                    <Footer.Link href="#">Youtube</Footer.Link>
                    <Footer.Link href="#">Twitter</Footer.Link>
                </Footer.Column>
            </Footer.Row>
            </Footer.Wrapper>
            <Copyright marginTop="15px"/>
        </Footer>
    )
}