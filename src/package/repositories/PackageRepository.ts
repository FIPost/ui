import { Package } from "../Package";

export interface IPackageRepository {
    GetAllPackages(): Promise<Array<Package>>;
    GetPackageByID(id: string): Promise<Package>;
    CreatePackage(employeeID: string, locationID: string, pkg: Package): Promise<void>;
    UpdatePackageLocation(employeeID: string, pkgID: string, locationID: string): Promise<void>;
    UpdatePackageDeliverd(employeeID: string, pkgID: string, receiverID: string): Promise<void>
    // DeletePackage(id: string): void;
}