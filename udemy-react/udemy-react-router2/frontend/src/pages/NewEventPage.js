import React from 'react';
import EventForm from '../components/EventForm';
import { json, redirect } from 'react-router-dom';

const NewEventPage = () => {
    return (
        <EventForm method="post" />
    );
};

export default NewEventPage;

export async function action({ request, params }) {
    // request에 form data가 포함되어 있음
    const data = await request.formData();
    // input field에 넣은 name값이 될것
    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('description')
    }
    const response = await fetch('http://localhost:8080/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    })

    if (response.status === 422) {
        return response
    }

    if (!response.ok) {
        throw json({ message: 'could not save event' }, { status: 500 })
    }

    return redirect('/events')
}