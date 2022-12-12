import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { Page } from '@/components/Page';
import { callApi } from '@/utils/apicall';

export default function UusiListaSivu() {
    const [name, setName] = useState<string>('');
    const [nameIsInvalid, setNameIsInvalid] = useState<boolean>(false);
    const router = useRouter();

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        const name = event.target.value;
        setName(name);
        if (name) setNameIsInvalid(false);
        else setNameIsInvalid(true);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name) {
            setNameIsInvalid(true);
            return;
        }

        const response = await callApi('/api/listat/', 'POST', {name});
        if (response && response?.id) {
            router.push(`/lista/${response.id}`);
        } else if (response && response.error) {
            alert(`Virhe: ${response.error}`);
        } else {
            console.error('Error from API', response);
            alert(`Virhe: ${JSON.stringify(response)}`);
        }
    }

    return (
        <Page title="Luo uusi kauppalista">
            <Form
                onSubmit={handleSubmit}
                className={nameIsInvalid ? 'was-validated' : undefined}
            >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label for="nimi">Nimi</Form.Label>
                    <Form.Control
                        id="nimi"
                        type="text"
                        required
                        placeholder="Anna kauppalistalle nimi"
                        onChange={handleNameChange}
                    />
                    <div className={'invalid-feedback'}>Nimi vaaditaan</div>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Luo
                </Button>
            </Form>
        </Page>
    );
}
