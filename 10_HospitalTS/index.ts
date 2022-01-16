class Patient{
    private id: string
    private diagnostic: string
    private sender: string
    private doctors: Map<string, Doctor>

    constructor(id:string){
        this.id = id
        this.diagnostic = ""
        this.sender = ""
        this.doctors = new Map<string, Doctor>()
    }

    getId():string{
        return this.id
    }

    getDiagnostic():string{
        return this.diagnostic
    }

    getSender():string{
        return this.sender
    }

    getDoctors():Doctor[]{
        return [...this.doctors.values()]
    }

    addDoctor(doctor: Doctor): void{
        if(this.doctors.has(doctor.getSpecialty()))
            return
        this.doctors.set(doctor.getSpecialty(), doctor)
        doctor.addPatient(this)  
    }

    removeDoctor(specialty: string){
        let doctor: Doctor | undefined = this.doctors.get(specialty)

        if(doctor !== undefined){
            this.doctors.delete(specialty)
            doctor.removePatient(this.id)
        }
    }

    public toString(): string {
        let doctors = this.doctors.keys();
        return this.id + " [" + [...doctors].join(", ") + "]";
    }
}

class Doctor{
    private name: string
    private specialty: string
    private sender: string
    private patients: Map<string, Patient>

    constructor(name:string, specialty:string){
        this.name = name
        this.specialty = specialty
        this.sender = ""
        this.patients = new Map<string, Patient>()
    }

    getName():string{
        return this.name
    }

    getSpecialty(): string{
        return this.specialty
    }

    getSender(): string{
        return this.sender
    }

    getPatients():Patient[]{
        return [...this.patients.values()]
    }

    addPatient(patient: Patient):void{
        if(this.patients.has(patient.getId()))
            return
        this.patients.set(patient.getId(), patient)
        patient.addDoctor(this)
    }

    removePatient(id: string){
        let patient: Patient | undefined = this.patients.get(id)

        if(patient !== undefined){
            this.patients.delete(id)
            patient.removeDoctor(this.specialty)
        }
    }

    public toString(): string {
        let patients = this.patients.keys();
        return this.name + " [" + [...patients].join(", ") + "]";
    }
}

class Hospital{
    private doctors: Map<string, Doctor>
    private patients: Map<string, Patient>

    constructor(){
        this.doctors = new Map<string,Doctor>()
        this.patients = new Map<string, Patient>()
    }

    addPatient(patient: Patient): void{
        if(!this.patients.has(patient.getId())){
            this.patients.set(patient.getId(), patient)
        }
    }

    addDoctor(doctor: Doctor): void{
        if(!this.doctors.has(doctor.getName())){
            this.doctors.set(doctor.getName(), doctor)
        }
    }

    getPatient(id: string): Patient{
        let patient: undefined | Patient = this.patients.get(id);
        if (patient === undefined)
            throw new Error("Paciente não encontrado");
        return patient;
    }

    getDoctor(name: string): Doctor{
        let doctor: undefined | Doctor = this.doctors.get(name);
        if (doctor === undefined)
            throw new Error("Doutor não encontrado");
        return doctor;
    }

    removePatient(id: string){
        let patient: Patient = this.getPatient(id);

        for(let doctor of patient.getDoctors()){
            doctor.removePatient(id)
        }

        this.patients.delete(id)
    }

    removeDoctor(name: string){
        let doctor: Doctor = this.getDoctor(name);

        for(let patient of doctor.getPatients()){
            patient.removeDoctor(doctor.getSpecialty())
        }

        this.doctors.delete(name)
    }

    connect(idPatient:string, nameDoctor: string){
        let patient: Patient = this.getPatient(idPatient)
        let doctor: Doctor = this.getDoctor(nameDoctor)

        patient.addDoctor(doctor)
    }
    
    disconnect(idPatient:string, nameDoctor: string){
        let patient: Patient = this.getPatient(idPatient)
        let doctor: Doctor = this.getDoctor(nameDoctor)

        patient.removeDoctor(doctor.getSpecialty())
    }

    public toString(): string {
        let patients = [...this.patients.values()].map(a => a.toString());
        let doctors = [...this.doctors.values()].map(d => d.toString());
        return "-- Pacientes:\n" + patients.join("\n") + "\n--Médicos:\n" + doctors.join("\n");
    }
}
let hospital = new Hospital();

hospital.addPatient(new Patient("Yuri"));
hospital.addPatient(new Patient("João"));
hospital.addPatient(new Patient("Sara"));

hospital.addDoctor(new Doctor("Naty", "Psicóloga"));
hospital.addDoctor(new Doctor("Edoardo", "Fisioterapeuta"));
hospital.addDoctor(new Doctor("Savila", "Nutricionista"));

hospital.connect("Yuri", "Naty"); // melhor conexão
hospital.connect("Yuri", "Savila");
hospital.connect("João", "Edoardo");
hospital.connect("Sara", "Naty");

console.log(hospital.toString());

hospital.removeDoctor("Edoardo");

console.log(hospital.toString());