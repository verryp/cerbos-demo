<script>
	let loading = false;
  let message
	let email = "verry.rlldev@gmail.com", password = "password" 
  export let isLoggedIn;
  export let token;

	const handleLogin = async () => {
    let defToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6bnVsbCwiY2xpZW50X2lkIjoxMTE1MSwidG9rZW5fdmVyc2lvbiI6IjEuMC4wIiwidG9rZW5fdHlwZSI6Imd1ZXN0X3Rva2VuIiwiYXVkIjoiMTAwNSIsImV4cCI6MTY1ODE3NTA5NCwianRpIjoiYTBmMDhmYzQtYjYwOS0zNWJlLTZkMDYtMjJjZGRhMzNhOGY5IiwiaWF0IjoxNjU4MDg4Njk0LCJpc3MiOiIvZXgvdjEvYXV0aG9yaXplIn0.nuv9tx-GyBKdmufZqj1Qxt0-pKlWCPgKgVp67KhUd4g-X9nojTcafc49jzWTLSxHDAGLOpBDMnvhCe6pFBAW9Dm74n3--J9CtTA3_IgYQ8DK6EdT0fqjoMBwZlKfKP9EYRyURcaezvGUY1hUfPK2a7Ccd1fD1ozDlKiI9uaEpns7opw_ULjRn7MEXdgDcOy7gViwZ5BYylsEjxfSi0EpLsGE0pOtmTAq1hqOlnO0_DFvACvlYE6EPTnAjxDO4espCvbC0iuWspQdA6W526dJzzf9S7HBrVZfeHB4NSXjaze9YLBkSnXP1EZTj3IQ6_Umk2jXgWoNWEwxSjGLtlPI6g'
		try {
			loading = true;
      const response = await fetch(
            'http://localhost:8080/sso/v1/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + defToken  },
                body: JSON.stringify({
                  "sso_code": "sso-ralali-group",
                  "grant_type": "login_password",
                  "email": email,
                  "password": password
                })
            }
        );

      const data = await response.json();
      if (data.name === "SUCCESS") {
        isLoggedIn = true
        token = data.data.access_token.value
        console.log(isLoggedIn);
        console.log(token);
      }
		} catch (error) {
			let errorMsg = error.error_description || error.message;
			message = { success: false, display: errorMsg };
		} finally {
			loading = false;
		}
	};
</script>

<section class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="https://cerbos.dev/assets/cerbos.svg" alt="Workflow">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
    </div>
    <form on:submit|preventDefault={handleLogin}>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" name="email" bind:value={email} type="email" autocomplete="email" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" bind:value={password}  type="password" autocomplete="current-password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
        </div>
      </div>

      <div>
        <button type="submit" value={loading ? "Loading" : "Log in"}
        disabled={loading} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
</section>