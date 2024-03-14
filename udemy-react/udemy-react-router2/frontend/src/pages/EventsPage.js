import { useLoaderData, json, defer, Await } from 'react-router-dom'
import { Suspense } from 'react';
import EventsList from '../components/EventsList';



function EventsPage() {
  const { events } = useLoaderData()
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>loading</p>}>
      <Await resolve={events}>
        {(loadedEvents) =>
          <EventsList events={loadedEvents} />
        }
      </Await>
    </Suspense>
  );
}

export default EventsPage;

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


export function loader() {
  // 페이지에서 오갈 수 있는 모든 http요청을 넣어줌
  // return받은 promise객체를 key값에 저장
  return defer({
    events: loadEvents()
  })
}