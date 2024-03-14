import { Link, useSubmit } from 'react-router-dom';
import classes from './EventItem.module.css';

function EventItem({ event }) {
  // 함수 형태, 첫 인자는 우리가 넣을 데이터
  // 두번째는 우리가 Form에서 사용하는 값과 기본적으로 같음
  const submit = useSubmit(null, { methods: 'delete', action: '', })

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?')
    if (proceed) {
      submit(null, { method: 'delete' })
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
