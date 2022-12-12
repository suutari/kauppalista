import {ReactNode} from 'react';
import {Col, Container, Row} from 'react-bootstrap';

export function Page({title, children}: {title: string; children: ReactNode}) {
    return (
        <Container fluid="md">
            <Row>
                <Col md="auto">
                    <h1>{title}</h1>
                    {children}
                </Col>
            </Row>
        </Container>
    );
}
