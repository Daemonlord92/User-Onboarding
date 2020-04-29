import React, { useState, useEffect} from 'react'
import axios from 'axios'
import * as yup from 'yup'

const Forms = props => {

	const initialFormState = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		quirks: "",
		reasons: "",
		terms: "",
	}

	const [post, setPost] = useState([])

	const [serverError, setServerError] = useState("")

	const [formState, setFormState] = useState(initialFormState)

	const [isButtonDisabled, setIsButtonDisabled] = useState(true)

	const [errors, setErrors] = useState(initialFormState)
  
  const formSchema = yup.object().shape({
  	name: yup.string().required("Name is a requirement!"),
  	email: yup
  			.string()
  			.email("Must be a valid email address")
  			.required(),
		terms: yup.boolean().oneOf([true], "You have to accept the terms of aggreements or no sign up"),
		password: yup
				.string()
				.required()
				.min(7, 'Shorter than tech standards try again'),
		confirmPassword: yup
				.string()
				.required()
				.test('passwords-match', 'Passwords must match', function(value) {return this.parent.password === value}),
		quirks: yup
				.string()
				.required("What Power you have"),
		reasons: yup
				.string()
				.required("Why are you going be a value to us"),
  })

  const validateChage = e => {
  	yup
  		.reach(formSchema, e.target.name)
  		.validate(e.target.value)
  		.then(valid => {
  			setErrors({ ...errors, [e.target.name]: ""})
  		})
  		.catch(err => {
  			console.log("Error Deku", err)
  			setErrors({ ...errors, [e.target.name]: err.errors })
  		})
  }

  useEffect(() => {
  	formSchema.isValid(formState).then(valid => {
  		setIsButtonDisabled(!valid)
  	})
  }, [formState])

  const formSubmit = e => {
  	e.preventDefault()

  	axios
  		.post("https://reqres.in/api/users", formState)
  		.then(response => {
  			setPost(response.data)

				setFormState(initialFormState)

				setServerError(null)
  		})
  		.catch(err => {
  			setServerError("Error Will Robertson", err)
  		})
  }

  const inputChange = e => {
  	e.persist()

  	const newFormData = {
  		...formState,
  		[e.target.name]:
  			e.target.type === "checkbox" ?
  			e.target.checked : e.target.value
  	}

  	validateChage(e)

  	setFormState(newFormData)
  }

	return (
		<>
			<form onSubmit={formSubmit} className="card">
				{serverError ? <p className="error">{serverError}</p> : null}
				<label htmlFor="name">
					Name
					<input
						id="name"
						type="text"
						name="name"
						onChange={inputChange}
						value={formState.name}
					/>
					{errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
				</label>
				<label htmlFor="email">
					Email
	        <input
	          type="text"
	          name="email"
	          onChange={inputChange}
	          value={formState.email}
	        />
	        {errors.email.length > 0 ? (
	          <p className="error">{errors.email}</p>
	        ) : null}
				</label>
				<label htmlFor="password">
					Password
					<input
						type="text"
						name="password"
						onChange={inputChange}
						value={formState.password}
					/>
					{errors.password.length > 0 ? (
						<p className="error">{errors.password}</p>) : null}
				</label>
				<label htmlFor="confirmPassword">
					Confirm Password
					<input
						type="text"
						name="confirmPassword"
						onChange={inputChange}
						value={formState.confirmPassword}
					/>
				</label>
				<label htmlFor="quirks">
	        What is your quirks
	        <select id="quirks" name="quirks" onChange={inputChange}>
	          <option value="">--Please choose an option--</option>
	          <option value="SuperSTR">Super Stength</option>
	          <option value="Mind Control">Mind Control</option>

	          <option value="Healing">Healing</option>

	          <option value="Metal Mending">Metal Mending</option>
	        </select>
	        {errors.quirks.length > 0 ? (
	          <p className="error">{errors.quirks}</p>
	        ) : null}
	      </label>
	      <label htmlFor="reasons">
	        Why would you like to join us?
	        <textarea
	          name="reasons"
	          onChange={inputChange}
	          value={formState.reasons}
	        />
	        {errors.reasons.length > 0 ? (
	          <p className="error">{errors.reasons}</p>
	        ) : null}
	      </label>
	      <label htmlFor="terms" className="terms">
	        <input
	          type="checkbox"
	          name="terms"
	          checked={formState.terms}
	          onChange={inputChange}
	        />
	        Terms & Conditions
	      </label>
	      <pre>{JSON.stringify(post, null, 2)}</pre>
	      <button disabled={isButtonDisabled} type="submit">
	        Submit
	      </button>
			</form>
		</>
		)
}

export default Forms