import {
	Control,
	Controller,
	FieldError,
	FieldPath,
	FieldValues,
	Merge,
	Path,
	RegisterOptions,
} from "react-hook-form";

type TextInputProps<TFieldValues extends FieldValues> = {
	name: Path<TFieldValues>;
	control: Control<TFieldValues, any>;
	label: string;
	rules?: Omit<
		RegisterOptions<TFieldValues, FieldPath<TFieldValues>>,
		"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
	>;
	disabled?: boolean;
	error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
};

function TextInput<TFieldValues extends FieldValues>({
	name,
	control,
	label,
	rules = {},
	disabled = false,
	error = undefined,
}: TextInputProps<TFieldValues>) {
	return (
		<Controller
		    name={name}
		    render={ ( {field,fieldState,formState} ) => (
		    <div className="row">
		    	<div className="input-field col s12">
		        	<input type="text" label={babel} disabled={disabled}  {...field}></input>
		        	<label htmlFor={field.name}>{label}</label>
		    	</div>
		    </div>
			)

			/>
	);
}

const TextInputRHF = ({
	name,
	control,
	label,
	rules,
	disabled,
	error,
}: TextInputProps<FieldValues>) => {
	const fieldId = name.toLowerCase();
	return (
		<div className="row">
			<div className="input-field col s12">
				<input
					id={fieldId}
					type="text"
					className="validate"
					value={value}
					onChange={(e) => onchange(e.target.value)}
				/>
				<label htmlFor={fieldId}>{name}</label>
				<span
					className="helper-text"
					data-error="wrong"
					data-success="right"
				>
					Helper text
				</span>
			</div>
		</div>
	);
};

export default TextInputRHF;
