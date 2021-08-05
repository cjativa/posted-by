interface IFormFieldProps {
    label: string;
    children: React.ReactNode;
}

export const FormField = ({ children, label }: IFormFieldProps) => {
    return (
        <div className="grid auto-rows-min gap-y-4">
            <label>{label}</label>

            {children}
        </div>
    );
};
