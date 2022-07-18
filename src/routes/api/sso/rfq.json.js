export async function POST ({ email, password } ) {
    const response = await fetch(
        'http://localhost:8080/sso/v1/login',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        }
      )

      const data = await response.json();
      return {body : data}
}