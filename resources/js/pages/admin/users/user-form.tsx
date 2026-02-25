import { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type UserFormData = {
    name: string;
    email: string;
    is_admin: boolean;
    force_password_change: boolean;
    reset_password: boolean;
};

type UserFormProps = {
    data: UserFormData;
    errors: Record<string, string>;
    processing: boolean;
    onChange: (key: keyof UserFormData, value: UserFormData[keyof UserFormData]) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    submitLabel: string;
    showForcePasswordChange?: boolean;
    showResetPassword?: boolean;
};

export default function UserForm({
    data,
    errors,
    processing,
    onChange,
    onSubmit,
    submitLabel,
    showForcePasswordChange = false,
    showResetPassword = false,
}: UserFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(event) => onChange('name', event.target.value)}
                    required
                />
                <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(event) => onChange('email', event.target.value)}
                    required
                />
                <InputError message={errors.email} />
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    id="is_admin"
                    checked={data.is_admin}
                    onCheckedChange={(checked) =>
                        onChange('is_admin', Boolean(checked))
                    }
                />
                <Label htmlFor="is_admin">Admin access</Label>
            </div>

            {showForcePasswordChange && (
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="force_password_change"
                        checked={data.force_password_change}
                        onCheckedChange={(checked) =>
                            onChange('force_password_change', Boolean(checked))
                        }
                    />
                    <Label htmlFor="force_password_change">
                        Require password change on next login
                    </Label>
                </div>
            )}

            {showResetPassword && (
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="reset_password"
                        checked={data.reset_password}
                        onCheckedChange={(checked) =>
                            onChange('reset_password', Boolean(checked))
                        }
                    />
                    <Label htmlFor="reset_password">
                        Reset password to default (password)
                    </Label>
                </div>
            )}

            <Button type="submit" disabled={processing}>
                {submitLabel}
            </Button>
        </form>
    );
}
