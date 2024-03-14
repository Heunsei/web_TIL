import { Form, useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
    // 액션을 트리거하거나 loader함수로 loader를 트리거하거나
    // 실제로 loader가 속한 페이지로 이동하지 않을 때 사용.
    // Form의 경우 이동을 하게 되지만, fetcher를 사용하면 이동을 안하게됨
    const fetcher = useFetcher()
    const { data, state } = fetcher
    useEffect(() => {
        if (state === 'idle' && data && data.message) {
            window.alert('data.message')
        }
    }, [data, state])

    return (
        <fetcher.Form
            method="post"
            action="/newsletter"
            className={classes.newsletter}
        >
            <input
                type="email"
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
    );
}

export default NewsletterSignup;