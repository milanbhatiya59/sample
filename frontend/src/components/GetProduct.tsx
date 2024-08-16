"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import SendData from "./SendData"
import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import oneImage from '../assets/one.jpeg';
import twoImage from '../assets/two.jpeg';
import threeImage from '../assets/three.jpeg';



const formSchema = z.object({
    productname: z.string().min(2, "Please enter the product name."),
    productcategory: z.string().min(1, "Category is required"),
    productprice: z.preprocess(
        (val) => parseFloat(val as string),
        z.number({
            required_error: 'This field is required',
            invalid_type_error: 'Please enter a number',
        }).int('Please enter a valid integer')
    ),
    productrating: z.preprocess(
        (val) => parseFloat(val as string),
        z.number({
            required_error: 'This field is required',
            invalid_type_error: 'Please enter a number',
        }).int('Please enter a valid integer')
    ),
    probability: z.preprocess(
        (val) => parseFloat(val as string),
        z.number({
            required_error: 'This field is required',
            invalid_type_error: 'Please enter a number',
        }).int('Please enter a valid integer')
    ),
})

export default function GetProduct() {

    const [tableData, setTableData] = useState([]);

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productRating, setProductRating] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [probability, setProbability] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productname: "",
            productprice: "",
            productrating: "",
            productcategory: "",
            probability: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setProductName(values.productname);
        setProductPrice(values.productprice);
        setProductRating(values.productrating);
        setProductCategory(values.productcategory);
        setProbability(values.probability);

        console.log(values)
        console.log(values.probability)


        form.reset({
            productname: "",
            productprice: "",
            productrating: "",
            productcategory: "",
            probability: "",
        });

        SendData(values)
            .then(response => {
                if (response.status === 'success') {

                    const receivedData = response['received_data'];
                    const filteredData = receivedData.map((item: any) => ({
                        cityName: item['cityName'],
                        successProbability: item['successProbability'],
                    }));
                    const sortedData = filteredData.sort((a: any, b: any) => b.successProbability - a.successProbability);
                    const finalData = sortedData.filter((item: any) => item.successProbability * 100 > values.probability).map((item: any) => item);

                    console.log(finalData)
                    setTableData(finalData);

                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }


    return (
        <div className="p-6 text-white rounded-lg h-auto w-full my-10 flex justify-center">

            {
                tableData.length === 0 &&

                <div className="bg-black p-6 rounded-lg h-fit my-14  w-1/2 mx-auto">
                    <div className="mb-4">
                        <p className="text-2xl text-slate-100 font-semibold">
                            Form for the Product Description Listing
                        </p>
                        <p className="text-md text-slate-300/80">
                            Give the product Description to get the desired output
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="productname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. Samsung S23" className="text-black" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mt-2">
                                <FormField
                                    control={form.control}
                                    name="productprice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter the product price"
                                                    type="number"
                                                    className="text-black"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mt-2 text-black">
                                <FormField
                                    control={form.control}
                                    name="productcategory"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">Product Category</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a product category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Electronics">Electronics</SelectItem>
                                                    <SelectItem value="Clothing">Clothing</SelectItem>
                                                    <SelectItem value="Shoes">Shoes</SelectItem>
                                                    <SelectItem value="Cosmetics">Cosmetics</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mt-2 text-black">
                                <FormField
                                    control={form.control}
                                    name="productrating"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">Product Rating</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a product rating" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1">1</SelectItem>
                                                    <SelectItem value="2">2</SelectItem>
                                                    <SelectItem value="3">3</SelectItem>
                                                    <SelectItem value="4">4</SelectItem>
                                                    <SelectItem value="5">5</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mt-2 text-black">
                                <FormField
                                    control={form.control}
                                    name="probability"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white">Product Probability</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter the product price"
                                                    type="number"
                                                    className="text-black"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form >
                </div >
            }


            {
                tableData.length > 0 &&

                <Tabs defaultValue="data" className="relative bottom-12 w-2/3 mx-auto mt-8">
                    <TabsList className="relative top-10 mb-2">
                        <TabsTrigger value="data">Data Table</TabsTrigger>
                        <TabsTrigger value="graphs">Graph Tables</TabsTrigger>
                    </TabsList>
                    <TabsContent value="data" className="">

                        <div className="bg-black p-6 rounded-lg h-auto my-10 w-full">

                            <div className="w-auto h-auto py-4 px-4 grid gap-1">
                                <h1 className="mb-3 text-2xl font-bold ">Product Description : </h1>
                                <div className="flex gap-4">
                                    <p className="py-2 px-4 bg-slate-800/50 rounded-md my-auto w-[20%]">Product Name : </p>
                                    <p className="bg-slate-500/50 py-2 px-4 rounded-md min-w-[20%] text-center">{productName}</p>
                                </div>

                                <div className="flex gap-4">
                                    <p className="py-2 px-4 bg-slate-800/50 rounded-md my-auto w-[20%]">Product Price : </p>
                                    <p className="bg-slate-500/50 py-2 px-4 rounded-md min-w-[20%] text-center">{productPrice}</p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="py-2 px-4 bg-slate-800/50 rounded-md my-auto w-[20%]">Product Rating : </p>
                                    <p className="bg-slate-500/50 py-2 px-4 rounded-md min-w-[20%] text-center">{productRating}</p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="py-2 px-4 bg-slate-800/50 rounded-md my-auto w-[20%]">Product Category : </p>
                                    <p className="bg-slate-500/50 py-2 px-4 rounded-md min-w-[20%] text-center">{productCategory}</p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="py-2 px-4 bg-slate-800/50 rounded-md my-auto w-[20%]">Range Probability : </p>
                                    <p className="bg-slate-500/50 py-2 px-4 rounded-md min-w-[20%] text-center">{probability}</p>
                                </div>
                            </div>

                            <div className="py-4 rounded-md w-full px-2">

                                <h1 className="mb-3 text-2xl font-bold mx-2">Data Table : </h1>

                                <div className="mt-2 w-full rounded-sm ">
                                    <div className="flex gap-2 px-4 my-2 ">
                                        <div className="w-[15%] text-center h-full py-2 bg-slate-800/50 rounded-md">Sr No.</div>
                                        <div className="w-1/2 text-center h-full py-2 bg-slate-800/50 rounded-md">City Name</div>
                                        <div className="w-1/2 text-center h-full py-2 bg-slate-800/50 rounded-md">Success Probability</div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        {
                                            tableData.map((data, index) => (
                                                <div key={index} className="flex gap-2 px-4">
                                                    <div className="w-[15%] text-center h-full py-2 bg-slate-500/50 rounded-md">{index + 1}</div>
                                                    <div className="w-1/2 text-center h-full py-2 bg-slate-500/50 rounded-md">{data['cityName']}</div>
                                                    <div className="w-1/2 text-center h-full py-2 bg-slate-500/50 rounded-md">{(data['successProbability'] * 100).toFixed(2) + '%'}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>


                    </TabsContent>
                    <TabsContent value="graphs">
                        <div className="bg-black px-10 py-6 rounded-lg h-auto my-10 w-full flex flex-col gap-4">
                            <h1 className="mb-3 text-2xl font-bold mx-2">Data Graphs : </h1>
                            <img src={oneImage} alt="Graph One" />
                            <img src={twoImage} alt="Graph Two" />
                            <img src={threeImage} alt="Graph Three" />
                        </div>
                    </TabsContent>
                </Tabs>

            }

        </div >
    );
}
