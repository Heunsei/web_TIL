import React, { Suspense } from 'react';
import EventItem from '../components/EventItem';
import { Await, defer, json, redirect, useRouteLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

const EventDetailPage = () => {
    // const data = useRouteLoaderData('event-detail')
    const { event, events } = useRouteLoaderData('event-detail')
    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>loading...</p>}>
                <Await resolve={event}>
                    {loadedEvent => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>loading...</p>}>
                <Await resolve={events}>
                    {loadedEvents => <EventsList event={loadedEvents} />}
                </Await>
            </Suspense>


        </>
    );
};
export default EventDetailPage;

async function loadEvent(id) {
    const response = await fetch(`http://localhost:8080/events/${id}`)
    if (!response.ok) {
        throw json({ message: 'could not fetch details for selected event' }, {
            status: 500,
        })
    } else {
        const resData = await response.json()
        return resData.events
    }
}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch events.' }
        // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
        //   status: 500,
        // })
        // return new Error()
        return json({ message: 'could not fetch events.' },
            {
                status: 500,
            }
        )

    } else {
        const resData = await response.json()
        return resData.events
    }
}


export async function loader({ request, params }) {
    console.log(request)
    console.log(params)
    const id = params.id
    return defer({
        event: loadEvent(id),
        events: loadEvents(),
    })
}

export async function action({ params, request }) {
    const eventId = params.id
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method
    })
    if (!response.ok) {
        throw json({ message: 'Could not delete event' }, { status: 500 })
    }
    return redirect('/events')
}