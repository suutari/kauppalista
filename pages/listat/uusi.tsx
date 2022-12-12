import {FormEvent, useRef} from 'react';
import {Button, Form} from 'react-bootstrap';

import {Page} from '@/components/Page';

export default function UusiListaSivu() {
    const nameInput = useRef<HTMLInputElement>(null);

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (!nameInput.current) return;
        const nimi = nameInput.current.value;

        // TODO: Kutsu APIa
    }

    return (
        <Page title="Luo uusi kauppalista">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nimi</Form.Label>
                    <Form.Control
                        name="nimi"
                        type="text"
                        placeholder="Anna kauppalistalle nimi"
                        ref={nameInput}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Luo
                </Button>
            </Form>
        </Page>
    );
}
