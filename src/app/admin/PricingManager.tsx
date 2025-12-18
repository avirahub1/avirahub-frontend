
'use client';

import { useState, useEffect } from 'react';
import { fetchPricing, savePricing, deletePricing } from '@/services/api';
import { useForm } from 'react-hook-form';
import { Pencil, Trash2, Plus, Check, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";

type PricingPlan = {
    _id: string;
    title: string;
    price: string | number;
    features: string[];
    popular: boolean;
    status: 'active' | 'inactive';
};

export default function PricingManager() {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
    const { toast } = useToast();

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<{
        title: string;
        price: string;
        features: string; // Comma separated for input
        popular: boolean;
        status: boolean; // mapped to active/inactive
    }>();


    const fetchPlans = async () => {
        try {
            const data = await fetchPricing();
            setPlans(data);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load pricing plans",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            const payload = {
                ...data,
                features: data.features.split('\n').map((f: string) => f.trim()).filter((f: string) => f),
                status: data.status ? 'active' : 'inactive',
            };
            if (editingPlan) payload._id = editingPlan._id;

            await savePricing(payload);

            toast({ title: "Success", description: `Plan ${editingPlan ? 'updated' : 'created'} successfully` });
            setIsDialogOpen(false);
            reset();
            setEditingPlan(null);
            fetchPlans();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Operation failed",
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await deletePricing(id);
            toast({ title: "Success", description: "Plan deleted" });
            fetchPlans();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete plan",
            });
        }
    };


    const startEdit = (plan: PricingPlan) => {
        setEditingPlan(plan);
        setValue('title', plan.title);
        setValue('price', String(plan.price));
        setValue('features', plan.features.join('\n'));
        setValue('popular', plan.popular);
        setValue('status', plan.status === 'active');
        setIsDialogOpen(true);
    };

    const handleAddNew = () => {
        setEditingPlan(null);
        reset();
        setValue('status', true); // Default active
        setIsDialogOpen(true);
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Pricing Plans</h2>
                <Button onClick={handleAddNew}>
                    <Plus className="w-4 h-4 mr-2" /> Add Plan
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div key={plan._id} className={`border rounded-lg p-6 relative bg-white shadow-sm ${plan.status === 'inactive' ? 'opacity-75' : ''}`}>
                        {plan.popular && (
                            <div className="absolute top-4 right-4">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            </div>
                        )}

                        <div className="mb-4">
                            <div className="flex justify-between items-start pr-8">
                                <h3 className="text-xl font-bold">{plan.title}</h3>
                            </div>
                            <p className="text-2xl font-bold text-primary mt-2">{plan.price}</p>
                            <Badge variant={plan.status === 'active' ? 'default' : 'secondary'} className="mt-2">
                                {plan.status}
                            </Badge>
                        </div>

                        <ul className="space-y-2 mb-6 text-sm text-gray-600">
                            {plan.features.slice(0, 5).map((feature, i) => (
                                <li key={i} className="flex items-center">
                                    <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                                    <span className="truncate">{feature}</span>
                                </li>
                            ))}
                            {plan.features.length > 5 && <li className="text-xs text-gray-400">+{plan.features.length - 5} more</li>}
                        </ul>

                        <div className="flex justify-end gap-2 mt-auto pt-4 border-t">
                            <Button variant="outline" size="sm" onClick={() => startEdit(plan)}>
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(plan._id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingPlan ? 'Edit Plan' : 'Add New Plan'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Title</label>
                            <Input {...register('title', { required: true })} placeholder="e.g. Starter" />
                            {errors.title && <span className="text-red-500 text-xs">Required</span>}
                        </div>

                        <div>
                            <label className="text-sm font-medium">Price</label>
                            <Input {...register('price', { required: true })} placeholder="e.g. ₹25,000 or Custom" />
                            {errors.price && <span className="text-red-500 text-xs">Required</span>}
                        </div>

                        <div>
                            <label className="text-sm font-medium">Features (one per line)</label>
                            <Textarea {...register('features', { required: true })} rows={5} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
                            {errors.features && <span className="text-red-500 text-xs">Required</span>}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Popular Plan</label>
                            <input type="checkbox" {...register('popular')} className="w-4 h-4" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Active Status</label>
                            <input type="checkbox" {...register('status')} className="w-4 h-4" />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
