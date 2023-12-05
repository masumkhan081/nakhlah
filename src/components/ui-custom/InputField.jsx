import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

const InputField = ({form,name,placeholder,type,isAdmin, payment,label, isItem}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {payment || isItem && <FormLabel className={`smallText ${isItem && 'textPrimaryColor textNormal'}`}>{label}</FormLabel>}
                    <FormControl>
                        <Input placeholder={placeholder} type={type} value={name || ''}  {...field} className={`normalText ${isItem? 'py-2 px-4 border-[2px] border-[--uDSubText] textNormal' :' py-3 px-4 border-2'}  ${isAdmin?'textSecondaryColor':' border-[--inputBorderPrimary] bg-[--bgSecondary] placeholder:text-black '}`}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default InputField;