
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    image: string;
    bio?: string;
    order: number;
    active: boolean;
}

export default function TeamManager() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const { toast } = useToast();

    const { register, handleSubmit, reset, setValue } = useForm<TeamMember>();

    const fetchMembers = async () => {
        try {
            const res = await fetch('/api/team');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setMembers(data);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to load team members" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            const payload = {
                ...data,
                // ensure number conversion
                order: Number(data.order)
            };

            const method = editingMember ? 'PUT' : 'POST';
            if (editingMember) payload._id = editingMember._id;

            const res = await fetch('/api/team', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Operation failed');

            toast({ title: "Success", description: `Team member ${editingMember ? 'updated' : 'added'} successfully` });
            fetchMembers();
            setIsDialogOpen(false);
            reset();
            setEditingMember(null);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Operation failed" });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this member?')) return;
        try {
            const res = await fetch(`/api/team?id=${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            toast({ title: "Success", description: "Member deleted" });
            fetchMembers();
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to delete" });
        }
    };

    const openEdit = (member: TeamMember) => {
        setEditingMember(member);
        reset(member);
        setIsDialogOpen(true);
    };

    const openAdd = () => {
        setEditingMember(null);
        reset({ name: '', role: '', image: '', bio: '', order: 0, active: true });
        setIsDialogOpen(true);
    }

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Team Members</h3>
                <Button onClick={openAdd}><Plus className="mr-2 h-4 w-4" /> Add Member</Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Order</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    No team members found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        )}
                        {members.map((member) => (
                            <TableRow key={member._id}>
                                <TableCell>
                                    <div className="relative h-10 w-10 rounded-full overflow-hidden border">
                                        <Image src={member.image} alt={member.name} fill className="object-cover" />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{member.name}</TableCell>
                                <TableCell>{member.role}</TableCell>
                                <TableCell>{member.order}</TableCell>
                                <TableCell>
                                    <Badge variant={member.active ? 'default' : 'secondary'}>
                                        {member.active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => openEdit(member)}>
                                                <Pencil className="mr-2 h-4 w-4" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(member._id)} className="text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingMember ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <Input {...register('name', { required: true })} placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Role</label>
                            <Input {...register('role', { required: true })} placeholder="Lead Developer" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Image URL</label>
                            <Input {...register('image', { required: true })} placeholder="https://..." />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Bio (Optional)</label>
                            <Textarea {...register('bio')} placeholder="Short bio..." />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Order</label>
                                <Input type="number" {...register('order')} defaultValue={0} />
                            </div>
                            <div className="flex items-center space-x-2 pt-6">
                                <Switch
                                    checked={editingMember ? undefined : true} // default true for new
                                    onCheckedChange={(checked) => setValue('active', checked)}
                                    {...register('active')}
                                />
                                <label className="text-sm font-medium">Active</label>
                            </div>
                        </div>
                        <Button type="submit" className="w-full">{editingMember ? 'Update' : 'Add'}</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
