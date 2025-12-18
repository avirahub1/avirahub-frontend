
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, GripVertical } from 'lucide-react';
import TeamManager from './TeamManager'; // Reuse existing TeamManager

interface StatItem {
    label: string;
    value: string;
    icon: string;
    order: number;
    active: boolean;
}


import { fetchCMS, updateCMS } from '@/services/api';

export default function AboutSectionsManager() {

    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const [stats, setStats] = useState<StatItem[]>([]);

    const teamHeaderForm = useForm();
    const statsSectionForm = useForm();



    const fetchContent = async () => {
        try {
            const data = await fetchCMS();

            const teamHeader = Array.isArray(data) ? data.find((d: any) => d.section === 'about_team') || {} : {};
            const statsSection = Array.isArray(data) ? data.find((d: any) => d.section === 'about_stats') || {} : {};

            teamHeaderForm.reset(teamHeader);
            statsSectionForm.reset({
                title: statsSection.title,
                description: statsSection.description,
            });
            setStats(statsSection.stats || []);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to load content" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const saveSectionHeader = async (section: string, data: any) => {
        try {
            const payload = { ...data, section };
            await updateCMS(payload);
            toast({ title: "Success", description: "Section header updated" });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to save" });
        }
    };

    const saveStats = async (updatedStats: StatItem[]) => {
        try {
            const formData = statsSectionForm.getValues();
            const payload = {
                section: 'about_stats',
                title: formData.title,
                description: formData.description,
                stats: updatedStats
            };
            await updateCMS(payload);
            setStats(updatedStats);
            toast({ title: "Success", description: "Stats updated" });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to save stats" });
        }
    };


    const addStat = () => {
        const newStat = { label: 'New Stat', value: '100+', icon: 'Award', order: stats.length + 1, active: true };
        const updated = [...stats, newStat];
        saveStats(updated);
    };

    const updateStat = (index: number, field: keyof StatItem, value: any) => {
        const updated = [...stats];
        updated[index] = { ...updated[index], [field]: value };
        saveStats(updated); // Auto-save on change? Maybe risky. Let's provide a save button for listing?
        // For improved UX in this quick implementation, I'll update local state and let user click strict save or auto-save.
        // Let's rely on local state update then explicit save for "list" changes to avoid spamming API?
        // Actually auto-save on blur implies complex handling.
        // Let's simpler: Update local, and then have a "Save Stats List" button?
        // Or just save whole "Stats Section" form including array.
        setStats(updated);
    };

    const deleteStat = (index: number) => {
        const updated = stats.filter((_, i) => i !== index);
        saveStats(updated);
    }

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <Tabs defaultValue="team" className="w-full">
            <TabsList>
                <TabsTrigger value="team">Our Team</TabsTrigger>
                <TabsTrigger value="stats">Trusted Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="team" className="space-y-6 mt-4">
                <div className="bg-white p-4 rounded-md border">
                    <h3 className="text-lg font-medium mb-4">Section Header</h3>
                    <form onSubmit={teamHeaderForm.handleSubmit((data) => saveSectionHeader('about_team', data))} className="grid gap-4 md:grid-cols-2 items-end">
                        <div>
                            <label className="text-sm font-medium">Section Title</label>
                            <Input {...teamHeaderForm.register('title')} placeholder="Meet the Team" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Section Subtitle</label>
                            <Input {...teamHeaderForm.register('subtitle')} placeholder="The creative minds..." />
                        </div>
                        <Button type="submit">Save Header</Button>
                    </form>
                </div>

                <div className="bg-white p-4 rounded-md border">
                    <h3 className="text-lg font-medium mb-4">Team Members</h3>
                    {/* Embed existing TeamManager */}
                    <TeamManager />
                </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-6 mt-4">
                <div className="bg-white p-4 rounded-md border">
                    <h3 className="text-lg font-medium mb-4">Stats Section Config</h3>
                    <form onSubmit={statsSectionForm.handleSubmit((data) => {
                        // Pass current stats items
                        saveStats(stats);
                    })} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Section Title</label>
                            <Input {...statsSectionForm.register('title')} placeholder="Trusted by the Best" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Description</label>
                            <Textarea {...statsSectionForm.register('description')} placeholder="Our track record..." />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium text-sm">Stat Items</h4>
                                <Button type="button" size="sm" onClick={addStat} variant="outline"><Plus className="h-4 w-4 mr-1" /> Add Item</Button>
                            </div>

                            {stats.map((stat, index) => (
                                <div key={index} className="flex flex-col sm:flex-row gap-3 items-end border p-3 rounded bg-gray-50">
                                    <div className="flex-1">
                                        <label className="text-xs">Label</label>
                                        <Input value={stat.label} onChange={(e) => updateStat(index, 'label', e.target.value)} />
                                    </div>
                                    <div className="w-24">
                                        <label className="text-xs">Value</label>
                                        <Input value={stat.value} onChange={(e) => updateStat(index, 'value', e.target.value)} />
                                    </div>
                                    <div className="w-32">
                                        <label className="text-xs">Icon (Lucide)</label>
                                        <Input value={stat.icon} onChange={(e) => updateStat(index, 'icon', e.target.value)} />
                                    </div>
                                    <div className="w-20">
                                        <label className="text-xs">Order</label>
                                        <Input type="number" value={stat.order} onChange={(e) => updateStat(index, 'order', parseInt(e.target.value))} />
                                    </div>
                                    <div className="flex items-center pb-2">
                                        <Switch checked={stat.active} onCheckedChange={(c) => updateStat(index, 'active', c)} />
                                    </div>
                                    <Button type="button" size="icon" variant="destructive" onClick={() => deleteStat(index)}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            ))}
                        </div>

                        <Button type="submit" className="w-full">Save Stats Section</Button>
                    </form>
                </div>
            </TabsContent>
        </Tabs>
    );
}
